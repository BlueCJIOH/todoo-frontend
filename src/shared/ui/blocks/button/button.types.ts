export type ButtonVariant =
  | 'primary'    // Основная кнопка (лаймовый фон)
  | 'toggle'     // Кнопка-переключатель
  | 'filter'     // Фильтр
  | 'secondary'; // Второстепенная кнопка

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
