import { Component } from '@angular/core';
import {ButtonComponent} from "../../../../../shared/ui/blocks/button";

@Component({
  selector: 'app-cta-section',
    imports: [
        ButtonComponent
    ],
  standalone: true,
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss',
})
export class CtaSectionComponent {

}
