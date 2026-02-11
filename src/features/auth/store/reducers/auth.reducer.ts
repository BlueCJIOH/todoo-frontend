import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState } from '../model/auth.model';
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.register, (state): AuthState => ({
        ...state,
        isLoading: true,
        registrationError: null,
        registrationSuccess: false
    })),

    on(AuthActions.registerSuccess, (state, { response }): AuthState => ({
        ...state,
        isLoading: false,
        registrationError: null,
        registrationSuccess: true
    })),

    on(AuthActions.registerFailure, (state, { error }): AuthState => ({
        ...state,
        isLoading: false,
        registrationError: error,
        registrationSuccess: false
    })),

    on(AuthActions.resetRegistrationState, (state): AuthState => ({
        ...state,
        registrationSuccess: false,
        registrationError: null
    })),

    on(AuthActions.verify, (state): AuthState => ({
        ...state,
        isVerifying: true,
        verificationError: null,
        verificationSuccess: false
      })),
    
      on(AuthActions.verifySuccess, (state, { response }): AuthState => ({
        ...state,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isAuthenticated: true,
        isVerifying: false,
        verificationSuccess: true,
        verificationError: null
      })),
    
      on(AuthActions.verifyFailure, (state, { error }): AuthState => ({
        ...state,
        isVerifying: false,
        verificationSuccess: false,
        verificationError: error
      })),
    
      on(AuthActions.resetVerificationState, (state): AuthState => ({
        ...state,
        verificationSuccess: false,
        verificationError: null
      }))

);