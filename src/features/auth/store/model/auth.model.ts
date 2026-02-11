import { User } from "./user.model";

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationResponse {
  status: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}


export interface VerificationResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationSuccess: boolean;
  registrationError: string | null;
  isVerifying: boolean;
  verificationSuccess: boolean;
  verificationError: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationSuccess: false,
  registrationError: null,
  isVerifying: false,
  verificationSuccess: false,
  verificationError: null
};