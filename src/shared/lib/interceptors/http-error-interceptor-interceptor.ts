// noinspection JSAnnotator

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { retry, tap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

export const httpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    retry({count: 3, delay: () => timer(1000) }),
    tap({
      error: (error: HttpErrorResponse) => {
        snackBar.open(error.message, 'close', {duration: 5000});
      }
    }),
  );
};
