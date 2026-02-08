import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

// Интерфейс для данных формы
interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  private hidePassword: boolean = true;
  private hideConfirmPassword: boolean = true;
  public registrationError: string | null = null;

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
  public onSubmit(): void {
    this.registrationError = null;

    if (this.registrationForm.invalid) {
      this.markAllAsTouched();
      this.registrationError = 'Пожалуйста, исправьте ошибки в форме';
      return;
    }

    // Проверка совпадения паролей
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registrationForm.get('confirmPassword')?.setErrors({ mismatch: true } as ValidationErrors);
      this.registrationError = 'Пароли не совпадают';
      return;
    }

    const formData: RegistrationFormData = this.registrationForm.value as RegistrationFormData;

    console.log('Registration data:', formData);

    // Здесь можно добавить логику отправки данных на сервер
    // this.authService.register(formData).subscribe(...);
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
