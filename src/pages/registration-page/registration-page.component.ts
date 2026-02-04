import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  hidePassword = true;
  hideConfirmPassword = true;
  registrationError: string | null = null;

  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[а-яА-ЯёЁa-zA-Z\s\-]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
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
      this.registrationForm.get('confirmPassword')?.setErrors({ mismatch: true });
      this.registrationError = 'Пароли не совпадают';
      return;
    }

    const { name, email, password: pwd } = this.registrationForm.value;

    console.log('Registration data:', { name, email, password: pwd });
  }

  private markAllAsTouched() {
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Геттеры для удобного доступа к полям формы и их ошибкам
  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  // Методы для получения сообщений об ошибках
  getNameErrorMessage(): string {
    if (this.name?.hasError('required')) {
      return 'Имя обязательно для заполнения';
    }
    if (this.name?.hasError('minlength')) {
      return 'Имя должно быть не менее 2 символов';
    }
    if (this.name?.hasError('maxlength')) {
      return 'Имя должно быть не более 50 символов';
    }
    if (this.name?.hasError('pattern')) {
      return 'Имя может содержать только буквы, пробелы и дефисы';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email обязателен для заполнения';
    }
    if (this.email?.hasError('email')) {
      return 'Неверный формат email';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Пароль обязателен для заполнения';
    }
    if (this.password?.hasError('minlength')) {
      return 'Пароль должен быть не менее 6 символов';
    }
    if (this.password?.hasError('pattern')) {
      return 'Пароль должен содержать заглавную букву, строчную букву и цифру';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (this.confirmPassword?.hasError('required')) {
      return 'Подтверждение пароля обязательно';
    }
    if (this.confirmPassword?.hasError('mismatch')) {
      return 'Пароли не совпадают';
    }
    return '';
  }
}
