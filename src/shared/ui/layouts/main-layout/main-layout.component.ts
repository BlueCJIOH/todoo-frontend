import { Component } from '@angular/core';
import {TopMenuComponent} from '../top-menu/top-menu.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    TopMenuComponent,
    RouterOutlet,
    FooterComponent,
  ],
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

}
