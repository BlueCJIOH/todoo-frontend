import { Component } from '@angular/core';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {CategoriesSectionComponent} from './categories-section/categories-section.component';
import {JobsSectionComponent} from './jobs-section/jobs-section.component';
import {StepsSectionComponent} from './steps-section/steps-section.component';
import {CtaSectionComponent} from './cta-section/cta-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroSectionComponent,
    CategoriesSectionComponent,
    JobsSectionComponent,
    StepsSectionComponent,
    CtaSectionComponent,
  ],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

}
