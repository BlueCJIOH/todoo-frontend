import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component.js'
import { RegistrationPageComponent } from '../pages/registration-page/registration-page.component';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';
import { ForgotPasswordPageComponent } from '../pages/forgot-password-page/forgot-password-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'ToDoo',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
    title: 'Registration',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    title: 'Registration',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: '404 - Not Found',
  },
];
