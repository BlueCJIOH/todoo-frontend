import { LoginPageComponent } from '../../pages/login/ui/login-page/login-page.component.js'
import { RegistrationPageComponent } from '../../pages/registration/ui/registration-page/registration-page.component';
import { ForgotPasswordPageComponent } from '../../pages/forgot-password/ui/forgot-password-page/forgot-password-page.component';
import {Routes} from '@angular/router';

export const authRoutes: Routes = [
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
    title: 'Forgot password',
  },
];
