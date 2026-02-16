import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage, AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import * as AuthActions from '../../../../features/auth/store/actions/auth.actions';
import * as AuthSelectors from '../../../../features/auth/store/selectors/auth.selectors';
import { RegistrationRequest } from '../../../../features/auth/store/model/auth.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  private hidePassword: boolean = true;
  private hideConfirmPassword: boolean = true;
  private destroy$ = new Subject<void>();

  // Состояние из Store
  isLoading$: Observable<boolean>;
  isVerifying$: Observable<boolean>;
  registrationSuccess$: Observable<boolean>;
  verificationSuccess$: Observable<boolean>;
  registrationError$: Observable<string | null>;
  verificationError$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  public registrationForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[а-яА-ЯёЁa-zA-Z\s\-]+$/)
      ],
      nonNullable: true
    }),
    email: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ],
      nonNullable: true
    }),
    password: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[а-яА-ЯёЁ]).+$/)
      ],
      nonNullable: true
    }),
    confirmPassword: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  constructor(private store: Store, private route: ActivatedRoute) {
    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
    this.registrationSuccess$ = this.store.select(AuthSelectors.selectRegistrationSuccess);
    this.registrationError$ = this.store.select(AuthSelectors.selectRegistrationError);
    this.isVerifying$ = this.store.select(AuthSelectors.selectIsVerifying);
    this.verificationError$ = this.store.select(AuthSelectors.selectVerificationError);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.verificationSuccess$ = this.store.select(AuthSelectors.selectVerificationSuccess);
  }

  public ngOnInit(): void {
    console.log('🚀 RegistrationPageComponent initialized');

    // ✅ Подписка на успешную регистрацию
    this.registrationSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          console.log('✅ Registration successful!');
          console.log('📋 User needs to check email for verification link');
        }
      });

    // ✅ Подписка на ошибку регистрации
    this.registrationError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          console.error('❌ Registration error:', error);
        }
      });

    // ✅ Подписка на успешную верификацию
    this.verificationSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          console.log('✅ Verification successful!');
          console.log('🔑 User is now authenticated');

          // Перенаправляем на главную или дашборд
          // setTimeout(() => {
          //   console.log('➡️ Redirecting to home page...');
          //   this.router.navigate(['/']);
          // }, 2000);
        }
      });

    // ✅ Подписка на ошибку верификации
    this.verificationError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          console.error('❌ Verification error:', error);
        }
      });

    // ✅ Подписка на изменение состояния аутентификации
    this.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        console.log('🔐 isAuthenticated:', isAuthenticated);
      });

    // ✅ Обработка query params для верификации
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const verifyToken = params['token'];

        if (verifyToken) {
          console.log('📨 Verification token received:', verifyToken.substring(0, 20) + '...');
          console.log('📤 Dispatching verify action...');

          this.store.dispatch(AuthActions.verify({ verifyToken }));

          console.log('✅ Verify action dispatched');
        } else {
          console.log('ℹ️ No verification token in URL');
        }
      });

    // ✅ Подписка на состояние загрузки
    this.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoading => {
        if (isLoading) {
          console.log('⏳ Registration request in progress...');
        } else {
          console.log('✅ Registration request completed');
        }
      });

    // ✅ Подписка на состояние верификации
    this.isVerifying$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isVerifying => {
        if (isVerifying) {
          console.log('⏳ Verification request in progress...');
        } else {
          console.log('✅ Verification request completed');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Переключение видимости пароля
   */
  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Переключение видимости подтверждения пароля
   */
  public toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  /**
   * Обработка отправки формы
   */
  /**
   * Обработка отправки формы
   */
  public onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registrationForm.get('confirmPassword')?.setErrors({ mismatch: true } as ValidationErrors);
      return;
    }

    const formData: RegistrationRequest = {
      username: this.registrationForm.get('name')!.value,
      email: this.registrationForm.get('email')!.value,
      password: this.registrationForm.get('password')!.value
    };

    this.store.dispatch(AuthActions.register({ credentials: formData }));
  }

  /**
   * Пометить все поля как затронутые для показа ошибок
   * @private
   */
  private markAllAsTouched(): void {
    Object.keys(this.registrationForm.controls).forEach((field: string) => {
      const control = this.registrationForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  public get isPasswordHidden(): boolean {
    return this.hidePassword;
  }

  public get isConfirmPasswordHidden(): boolean {
    return this.hideConfirmPassword;
  }

  /**
   * Геттер для поля имени
   */
  public get name(): FormControl<string> | null {
    return this.registrationForm.get('name') as FormControl<string>;
  }

  /**
   * Геттер для поля email
   */
  public get email(): FormControl<string> | null {
    return this.registrationForm.get('email') as FormControl<string>;
  }

  /**
   * Геттер для поля пароля
   */
  public get password(): FormControl<string> | null {
    return this.registrationForm.get('password') as FormControl<string>;
  }

  /**
   * Геттер для поля подтверждения пароля
   */
  public get confirmPassword(): FormControl<string> | null {
    return this.registrationForm.get('confirmPassword') as FormControl<string>;
  }

  /**
   * Получение сообщения об ошибке для поля имени
   */
  public getNameErrorMessage(): string {
    const control = this.name;

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Имя обязательно для заполнения';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength')?.requiredLength || 2;
      return `Имя должно быть не менее ${minLength} символов`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength')?.requiredLength || 20;
      return `Имя должно быть не более ${maxLength} символов`;
    }
    if (control.hasError('pattern')) {
      return 'Имя может содержать только буквы, пробелы и дефисы';
    }
    return '';
  }

  /**
   * Получение сообщения об ошибке для поля email
   */
  public getEmailErrorMessage(): string {
    const control = this.email;

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Email обязателен для заполнения';
    }
    if (control.hasError('email')) {
      return 'Неверный формат email';
    }
    if (control.hasError('pattern')) {
      return 'Неверный формат email';
    }
    return '';
  }

  /**
   * Получение сообщения об ошибке для поля пароля
   */
  public getPasswordErrorMessage(): string {
    const control = this.password;

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Пароль обязателен для заполнения';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength')?.requiredLength || 8;
      return `Пароль должен быть не менее ${minLength} символов`;
    }
    if (control.hasError('pattern')) {
      return 'Пароль должен содержать заглавную и строчную букву латинского алфавита и цифру';
    }
    return '';
  }

  /**
   * Получение сообщения об ошибке для поля подтверждения пароля
   */
  public getConfirmPasswordErrorMessage(): string {
    const control = this.confirmPassword;

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Подтверждение пароля обязательно';
    }
    if (control.hasError('mismatch')) {
      return 'Пароли не совпадают';
    }
    return '';
  }
}
