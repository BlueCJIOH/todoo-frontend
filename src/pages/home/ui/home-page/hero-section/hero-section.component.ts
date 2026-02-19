import { Component } from '@angular/core';
import {ButtonComponent} from '../../../../../shared/ui/blocks/button';

@Component({
  selector: 'app-hero-section',
  imports: [
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  public personRole: string = 'customer';

  public changePersonRole(personRole: string) {
    
  }
}
