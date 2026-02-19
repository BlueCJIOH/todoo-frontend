import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '../pages/not-found/ui/not-found-page/not-found-page.component';
import {authRoutes} from './routes/auth.routes';
import {mainLayoutRoutes} from './routes/main-layout.routes';

export const routes: Routes = [
    ...authRoutes,
    ...mainLayoutRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Not Found',
  },
];
