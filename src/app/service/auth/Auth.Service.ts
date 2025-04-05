import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { GetBaseURL } from '../../constants/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { USER_ROLE, MICROSERVICE_NAME } from '../../constants/Enums';
import { catchError, map, tap } from 'rxjs/operators';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLE_KEY = 'userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private loginStatusSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private userRoleSubject = new BehaviorSubject<string>(this.getStoredUserRole());
  
  loginStatus$ = this.loginStatusSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  masterLogin(email: string, password: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.AUTHENTICATION), { email, password })
      .pipe(
        tap(response => this.handleLoginResponse(response, USER_ROLE.ROLE_MASTER)),
        catchError(error => {
          console.error('Master login error:', error);
          return throwError(() => error);
        })
      );
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.ADMIN), { email, password })
      .pipe(
        tap(response => this.handleLoginResponse(response, USER_ROLE.ROLE_ADMIN)),
        catchError(error => {
          console.error('Admin login error:', error);
          return throwError(() => error);
        })
      );
  }

  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.USER), { email, password })
      .pipe(
        tap(response => this.handleLoginResponse(response, USER_ROLE.ROLE_CUSTOMER)),
        catchError(error => {
          console.error('User login error:', error);
          return throwError(() => error);
        })
      );
  }

  sellerLogin(email: string, password: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.SELLER), { email, password })
      .pipe(
        tap(response => this.handleLoginResponse(response, USER_ROLE.ROLE_SELLER)),
        catchError(error => {
          console.error('Seller login error:', error);
          return throwError(() => error);
        })
      );
  }

  // Handle login response and store tokens
  private handleLoginResponse(response: any, expectedRole: string): void {
    if (response && response.jwt && response.refreshToken) {
      this.saveTokens(response.jwt, response.refreshToken);
      
      // Verify the role matches what we expect
      const decodedToken = this.jwtHelper.decodeToken(response.jwt);
      const actualRole = decodedToken?.role || '';
      
      if (actualRole && actualRole.toUpperCase() === expectedRole.toUpperCase()) {
        this.saveUserRole(actualRole);
        this.loginStatusSubject.next(true);
      } else {
        console.error('Role mismatch in token:', actualRole, 'expected:', expectedRole);
        this.logout();
      }
    } else {
      console.error('Invalid login response format');
      this.logout();
    }
  }

  // Get the access token
  getToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  // Get the refresh token
  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  // Save both tokens
  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  // Get user role from token
  getUserRole(): string {
    const token = this.getToken();
    if (!token) return USER_ROLE.GUEST;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.role || USER_ROLE.GUEST;
    } catch (error) {
      console.error('Error decoding token:', error);
      return USER_ROLE.GUEST;
    }
  }

  // Get stored user role
  getStoredUserRole(): string {
    return sessionStorage.getItem(USER_ROLE_KEY) || USER_ROLE.GUEST;
  }

  // Save user role
  saveUserRole(role: string): void {
    sessionStorage.setItem(USER_ROLE_KEY, role);
    this.userRoleSubject.next(role);
  }

  // Check if user is logged in
  isUserLoggedIn(): boolean {
    return !!this.getToken() && !!this.getRefreshToken();
  }

  // Refresh token
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post(GetBaseURL(MICROSERVICE_NAME.AUTHENTICATION) + 'refresh', { refreshToken })
      .pipe(
        tap((response: any) => {
          if (response && response.jwt) {
            // Keep the same refresh token, just update the access token
            this.saveTokens(response.jwt, refreshToken);
          } else {
            this.logout();
          }
        }),
        catchError(error => {
          console.error('Token refresh error:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_ROLE_KEY);
    this.loginStatusSubject.next(false);
    this.userRoleSubject.next(USER_ROLE.GUEST);
  }
}
