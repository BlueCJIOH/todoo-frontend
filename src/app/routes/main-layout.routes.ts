import {Routes} from '@angular/router';
import {MainLayoutComponent} from '../../shared/ui/layouts/main-layout/main-layout.component';
import {HomePageComponent} from '../../pages/home/ui/home-page/home-page.component';

export const mainLayoutRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        title: 'Home',
      },
    ],
    title: 'ToDoo',
  },
];
