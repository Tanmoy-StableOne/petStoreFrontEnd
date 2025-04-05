import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, take, switchMap, throwError } from 'rxjs';
import { AuthService } from './Auth.Service';
import { BehaviorSubject } from 'rxjs';

const refreshTokenSubject = new BehaviorSubject<any>(null);
let isRefreshing = false;

export const tokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  
  // Get the token from the auth service
  const token = authService.getToken();
  
  // If we have a token, add it to the request
  if (token) {
    request = addToken(request, token);
  }

  // Handle the request
  return next(request).pipe(
    catchError(error => {
      // If the error is 401 Unauthorized and we're not already refreshing
      if (error instanceof HttpErrorResponse && error.status === 401 && !isRefreshing) {
        return handle401Error(request, next, authService);
      }
      
      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn,
  authService: AuthService
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshAccessToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(response);
        
        // Retry the original request with the new token
        const newToken = authService.getToken();
        return next(addToken(request, newToken || ''));
      }),
      catchError(error => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      })
    );
  }

  // If we're already refreshing, wait for the refresh to complete
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(() => {
      const newToken = authService.getToken();
      return next(addToken(request, newToken || ''));
    })
  );
} 