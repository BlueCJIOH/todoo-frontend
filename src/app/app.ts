import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './layouts/top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todoo-front');
}
