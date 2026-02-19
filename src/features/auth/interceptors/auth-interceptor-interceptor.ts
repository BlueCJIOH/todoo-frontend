import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authRequest = req.clone({
    // setHeaders: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`
    // }
  });
  return next(authRequest);
};
