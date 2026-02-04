import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  hidePassword = true;
  loginError: string | null = null;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(email: string, password: string) {
    this.loginError = null;
    if(password === '1234') {
      this.loginError = 'Неверный логин или пароль'
    }
    console.log('Login data:', { email, password });
  }
}
