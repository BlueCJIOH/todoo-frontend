import { Component } from '@angular/core';
import { ButtonComponent} from '../../../../../shared/ui/blocks/button';
import { SlideToggleComponent, SlideToggleOption } from '../../../../../shared/ui/blocks/slide-toggle';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent, SlideToggleComponent, SlideToggleComponent],
  templateUrl: './hero-section.component.html'
})
export class HeroSectionComponent {
  public roleOptions: SlideToggleOption[] = [
    { value: 'customer', label: 'Я заказчик' },
    { value: 'performer', label: 'Я исполнитель' }
  ];

  public selectedRole: string = 'customer';

  get heroTitle(): string {
    return this.selectedRole === 'customer'
      ? 'Найдите надежного исполнителя для любой задачи'
      : 'Найдите оплачиваемые задачи от реальных заказчиков рядом';
  }

  get ctaText(): string {
    return this.selectedRole === 'customer'
      ? 'Опубликовать задачу'
      : 'Найти задачи';
  }


  public onRoleClick(option: SlideToggleOption): void {
    console.log('Клик по роли:', option);
  }
}
