import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../model/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoading
);

export const selectRegistrationSuccess = createSelector(
    selectAuthState,
    (state: AuthState) => state.registrationSuccess
);

export const selectRegistrationError = createSelector(
    selectAuthState,
    (state: AuthState) => state.registrationError
);