import { createAction, props } from '@ngrx/store';
import { RegistrationRequest, RegistrationResponse } from '../model/auth.model';

export const register = createAction(
    '[Auth] Register',
    props<{ response: RegistrationRequest }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ response: RegistrationResponse }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: string }>()
);

export const resetRegistrationState = createAction(
    '[Auth] Reset Registration State'
);