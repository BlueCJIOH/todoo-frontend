export type ButtonVariant =
  | 'primary'
  | 'filter'
  | 'filter_active'
  | 'secondary';

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
}
