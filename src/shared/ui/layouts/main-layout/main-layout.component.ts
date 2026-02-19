import { Component } from '@angular/core';
import {TopMenuComponent} from '../top-menu/top-menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [TopMenuComponent, RouterOutlet],
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

}
