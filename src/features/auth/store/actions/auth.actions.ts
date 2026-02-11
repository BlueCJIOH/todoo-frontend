import { createAction, props } from '@ngrx/store';
import { 
  RegistrationRequest, 
  RegistrationResponse, 
  VerificationResponse 
} from '../model/auth.model';

export const register = createAction(
  '[Auth] Register',
  props<{ credentials: RegistrationRequest }>()
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

export const verify = createAction(
  '[Auth] Verify',
  props<{ verifyToken: string }>()
);

export const verifySuccess = createAction(
  '[Auth] Verify Success',
  props<{ response: VerificationResponse }>()
);

export const verifyFailure = createAction(
  '[Auth] Verify Failure',
  props<{ error: string }>()
);

export const resetVerificationState = createAction(
  '[Auth] Reset Verification State'
);