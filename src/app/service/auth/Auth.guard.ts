import { RESPONSE_TYPE_COLOR } from './../../constants/KeywordsAndConstrants';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Auth.Service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../common-component/custom-alert/custom-alert.component';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AuthGuard activated for:', state.url);
    const token = this.authService.getToken();

    // If no token, redirect to login
    if (!token) {
      this.openDialog("Login", "Authentication required. Redirecting to login", RESPONSE_TYPE_COLOR.ERROR, 'login');
      return false;
    }

    // Check if token is expired
    if (this.jwtHelper.isTokenExpired(token)) {
      // Try to refresh the token
      return this.authService.refreshAccessToken().pipe(
        map(() => this.checkRoleAccess(route)),
        catchError(error => {
          console.error('Token refresh failed:', error);
          this.openDialog("Login", "Session expired. Please login again", RESPONSE_TYPE_COLOR.ERROR, 'login');
          return of(false);
        })
      );
    }

    // Token is valid, check role access
    return this.checkRoleAccess(route);
  }

  private checkRoleAccess(route: ActivatedRouteSnapshot): boolean {
    try {
      const token = this.authService.getToken();
      if (!token) {
        return false;
      }
      
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);

      const requiredRole = route.data['role'];
      console.log('Required Role:', requiredRole);
      
      // Get role from token or from stored role
      const userRole = decodedToken?.role || this.authService.getStoredUserRole();
      console.log('User Role:', userRole);

      if (requiredRole && userRole?.toUpperCase() !== requiredRole.toUpperCase()) {
        this.openDialog("Access Denied", "You don't have permission to access this resource", RESPONSE_TYPE_COLOR.ERROR, "un-authorized");
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking role access:', error);
      this.openDialog("Error", "Error verifying authentication", RESPONSE_TYPE_COLOR.ERROR, "login");
      return false;
    }
  }

  openDialog(dialogTitle: string, dialogText: string, dialogType: number, navigateRoute: any): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, { data: { title: dialogTitle, text: dialogText, type: dialogType } });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (navigateRoute) {
        this.router.navigate([`/${navigateRoute}`]);
      }
    });
  }
}
