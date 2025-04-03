import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetBaseURL, MicroServiceEndpointType } from '../../constants/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { USER_ROLE, MICROSERVICE_NAME } from '../../constants/Enums';
import { AUTH_TOKEN } from './../../constants/KeywordsAndConstrants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private loginStatusSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  masterLogin(email: string, password: string, userType: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.AUTHENTICATION as keyof typeof MicroServiceEndpointType), { email, password });
  }

  adminLogin(email: string, password: string, userType: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.ADMIN as keyof typeof MicroServiceEndpointType), { email, password });
  }

  userLogin(email: string, password: string, userType: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.USER as keyof typeof MicroServiceEndpointType), { email, password });
  }

  sellerLogin(email: string, password: string, userType: string): Observable<any> {
    return this.http.post(GetBaseURL(MICROSERVICE_NAME.SELLER as keyof typeof MicroServiceEndpointType), { email, password });
  }

  getToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  saveToken(token: string) {
    sessionStorage.setItem('authToken', token);
    this.loginStatusSubject.next(true);
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return USER_ROLE.GUEST;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.user_role || USER_ROLE.GUEST;
    } catch (error) {
      console.error('Error decoding token:', error);
      return USER_ROLE.GUEST;
    }
  }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logout() {
    sessionStorage.clear();
  }
}
