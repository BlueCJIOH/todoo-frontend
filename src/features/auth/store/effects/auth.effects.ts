import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(action.credentials).pipe(
          map(response => AuthActions.registerSuccess({ response })),
          catchError(error =>
            of(AuthActions.registerFailure({ error: this.getErrorMessage(error) }))
          )
        )
      )
    );
  });

  verify$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.verify),
      switchMap((action) =>
        this.authService.verifyRegistration(action.verifyToken).pipe(
          map(response => AuthActions.verifySuccess({ response })),
          catchError(error =>
            of(AuthActions.verifyFailure({ error: this.getErrorMessage(error) }))
          )
        )
      )
    );
  });

  private getErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      return 'Ошибка сети: ' + error.error.message;
    }

    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 400:
        return 'Некорректные данные';
      case 401:
        return 'Неверный токен верификации';
      case 403:
        return 'Доступ запрещен';
      case 404:
        return 'Токен не найден';
      case 409:
        return 'Пользователь уже существует';
      case 500:
        return 'Внутренняя ошибка сервера';
      default:
        return 'Произошла ошибка. Попробуйте позже';
    }
  }
}