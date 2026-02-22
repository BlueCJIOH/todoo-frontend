import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SlideToggleOption } from './slide-toggle.types';

@Component({
  selector: 'app-slide-toggle',
  imports: [],
  standalone: true,
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent implements OnInit {
  @Input() public options: SlideToggleOption[] = [];
  @Input() public selected: string | number | null = null;
  @Input() public disabled: boolean = false;
  @Input() public fullWidth: boolean = false;

  @Output() public selectedChange = new EventEmitter<string | number>();
  @Output() public optionClicked = new EventEmitter<SlideToggleOption>();

  ngOnInit(): void {
    if (this.selected === null && this.options.length > 0) {
      this.selected = this.options[0].value;
      this.selectedChange.emit(this.selected);
    }
  }

  public selectOption(option: SlideToggleOption): void {
    if (this.disabled) return;

    if (this.selected === option.value) {
      this.optionClicked.emit(option);
      return;
    }

    this.selected = option.value;
    this.selectedChange.emit(this.selected);
    this.optionClicked.emit(option);
  }

  public getSliderTransform(): string {
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === -1) return 'translateX(0)';
    return `translateX(${selectedIndex * 100}%)`;
  }

  public getSelectedIndex(): number {
    return this.options.findIndex(opt => opt.value === this.selected);
  }

  public getOptionClasses(option: SlideToggleOption): string {
    const base = 'relative z-10 flex-1 py-1 text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0';
    const active = 'text-gray-900';
    const inactive = 'text-gray-500';
    return `${base} ${this.selected === option.value ? active : inactive}`;
  }

  public getContainerClasses(): string {
    const base = 'relative inline-flex bg-lime-100 rounded-lg p-1';
    const width = this.fullWidth ? 'w-full' : 'w-64';
    const height = 'h-10';
    return `${base} ${width} ${height}`;
  }
}
