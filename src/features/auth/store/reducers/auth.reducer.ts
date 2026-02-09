import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState } from '../model/auth.model';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

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
    
);