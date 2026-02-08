import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  hidePassword = true;
  loginError: string | null = null;

  constructor(private router: Router) {}

  public togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  public goToForgotPassword(emailInput: HTMLInputElement): void {
    const email = emailInput.value.trim();
    if (email) {
      this.router.navigate(['/forgot-password'], {
        queryParams: { email: email }
      });
    } else {
      this.router.navigate(['/forgot-password']);
    }
  }

  public onSubmit(email: string, password: string) {
    this.loginError = null;
    if(password === '1234') {
      this.loginError = 'Неверный логин или пароль'
    }
    console.log('Login data:', { email, password });
  }
}
