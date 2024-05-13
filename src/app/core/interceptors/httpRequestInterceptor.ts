import type { HttpInterceptorFn } from '@angular/common/http';

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {
    debugger;
    if(typeof window === 'undefined') {
        return next(req);
    }
    else {
        const token = localStorage.getItem('accessToken');
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next(req);        
    }
};