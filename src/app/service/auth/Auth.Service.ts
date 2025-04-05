import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { GetAPIEndpoint } from '../../constants/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { USER_ROLE, MICROSERVICE_NAME } from '../../constants/Enums';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse, LoginRequest, RefreshTokenRequest, TokenPayload } from '../../interfaces/auth.interface';

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

  private login(email: string, password: string, microservice: MICROSERVICE_NAME, expectedRole: USER_ROLE): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    const endpoint = GetAPIEndpoint(MICROSERVICE_NAME.AUTHENTICATION, 'login');

    return this.http.post<LoginResponse>(endpoint, loginRequest)
      .pipe(
        tap(response => this.handleLoginResponse(response, expectedRole)),
        catchError(error => {
          console.error(`${expectedRole} login error:`, error);
          return throwError(() => error);
        })
      );
  }

  masterLogin(email: string, password: string): Observable<LoginResponse> {
    return this.login(email, password, MICROSERVICE_NAME.AUTHENTICATION, USER_ROLE.ROLE_MASTER);
  }

  adminLogin(email: string, password: string): Observable<LoginResponse> {
    return this.login(email, password, MICROSERVICE_NAME.ADMIN, USER_ROLE.ROLE_ADMIN);
  }

  userLogin(email: string, password: string): Observable<LoginResponse> {
    return this.login(email, password, MICROSERVICE_NAME.USER, USER_ROLE.ROLE_CUSTOMER);
  }

  sellerLogin(email: string, password: string): Observable<LoginResponse> {
    return this.login(email, password, MICROSERVICE_NAME.SELLER, USER_ROLE.ROLE_SELLER);
  }

  // Handle login response and store tokens
  private handleLoginResponse(response: LoginResponse, expectedRole: string): void {
    if (response?.jwt && response?.refreshToken) {
      this.saveTokens(response.jwt, response.refreshToken);
      
      const decodedToken = this.jwtHelper.decodeToken<TokenPayload>(response.jwt);
      const actualRole = decodedToken?.role || '';
      
      if (actualRole && actualRole.toUpperCase() === expectedRole.toUpperCase()) {
        this.saveUserRole(actualRole);
        this.loginStatusSubject.next(true);
      } else {
        console.error('Role mismatch in token:', actualRole, 'expected:', expectedRole);
        this.logout();
        throw new Error('Role mismatch in token');
      }
    } else {
      console.error('Invalid login response format');
      this.logout();
      throw new Error('Invalid login response format');
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
      const decodedToken = this.jwtHelper.decodeToken<TokenPayload>(token);
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
    return this.isAuthenticated();
  }

  // Refresh token
  refreshAccessToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const refreshRequest: RefreshTokenRequest = { refreshToken };
    const endpoint = GetAPIEndpoint(MICROSERVICE_NAME.AUTHENTICATION, 'refresh');

    return this.http.post<LoginResponse>(endpoint, refreshRequest)
      .pipe(
        tap(response => {
          if (response?.jwt) {
            // Keep the same refresh token, just update the access token
            this.saveTokens(response.jwt, refreshToken);
          } else {
            throw new Error('Invalid refresh token response');
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
  logout(): Observable<void> {
    const token = this.getToken();
    if (token) {
      const endpoint = GetAPIEndpoint(MICROSERVICE_NAME.AUTHENTICATION, 'logout');
      return this.http.post<void>(endpoint, {}).pipe(
        tap(() => this.clearSession()),
        catchError(error => {
          this.clearSession();
          return throwError(() => error);
        })
      );
    }
    
    this.clearSession();
    return of(void 0);
  }

  // Clear session data
  private clearSession(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_ROLE_KEY);
    this.loginStatusSubject.next(false);
    this.userRoleSubject.next(USER_ROLE.GUEST);
  }
}
