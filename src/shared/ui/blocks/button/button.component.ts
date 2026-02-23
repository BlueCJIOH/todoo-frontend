import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { ButtonVariant, ButtonSize, ButtonType } from './button.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: []
})
export class ButtonComponent {
  // Входные параметры
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() isActive: boolean = false;

  // Выходное событие
  @Output() clicked = new EventEmitter<void>();

  // Привязка классов к хост-элементу
  @HostBinding('class') get hostClasses(): string {
    return [
      // Базовые стили
      'inline-flex items-center justify-center font-bold transition-colors duration-200',

      // Размеры
      this.getSizeClasses(),

      // Варианты
      this.getVariantClasses(),

      // Состояния
      this.getStateClasses()
    ].filter(Boolean).join(' ');
  }

  // Привязка атрибута disabled
  @HostBinding('attr.disabled') get isDisabledAttr(): string | null {
    return (this.disabled || this.loading) ? 'disabled' : null;
  }

  @HostBinding('attr.isActive') get isActiveAttr(): string | null {
    return (this.isActive) ? 'is-active' : null;
  }

  // Обработчик клика
  public onClick($event: MouseEvent): void {
    if (this.disabled || this.loading) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }
    this.isActive = true;
    this.clicked.emit();
  }

  // Классы для размеров
  private getSizeClasses(): string {
    const map: Record<ButtonSize, string> = {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-3 py-1.5',
      lg: 'text-lg px-4 py-2 w-full font-bold',
      xl: 'text-xl px-6 py-3 font-bold'
    };
    return map[this.size];
  }

  // Классы для вариантов
  private getVariantClasses(): string {
    const map: Record<ButtonVariant, string> = {
      primary: 'bg-lime-400 text-black hover:bg-lime-500 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 rounded-lg',
      filter: 'bg-white border border-lime-400 text-black hover:bg-lime-400 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 rounded-full',
      filter_active: 'bg-lime-400 border border-lime-400 text-black focus:ring-2 focus:ring-offset-2 rounded-full',
      secondary: 'bg-lime-100 border border-lime-400 rounded-lg text-gray-700 hover:bg-lime-400 hover:text-black transition-colors duration-200'
    };
    return map[this.variant];
  }

  // Классы для состояний
  private getStateClasses(): string {
    if (this.loading) return 'opacity-75 cursor-wait';
    if (this.disabled) return 'opacity-50 cursor-not-allowed';
    if (this.isActive) return 'is-active bg-lime-400 text-black';
    return 'cursor-pointer';
  }
}
