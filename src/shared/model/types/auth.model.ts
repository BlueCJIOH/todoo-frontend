export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
