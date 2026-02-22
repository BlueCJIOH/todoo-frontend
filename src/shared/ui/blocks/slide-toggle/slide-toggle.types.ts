export interface SlideToggleOption {
  value: string | number;
  label: string;
}

export interface SlideToggleConfig {
  options: SlideToggleOption[];
  selected?: string | number;
  disabled?: boolean;
  fullWidth?: boolean;
}
