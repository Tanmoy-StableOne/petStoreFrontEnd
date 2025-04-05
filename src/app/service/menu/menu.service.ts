import { Injectable, OnDestroy } from '@angular/core';
import { USER_ROLE } from '../../constants/Enums';
import { AuthService } from '../auth/Auth.Service';
import { MenuDataService } from './menu.data.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, catchError, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuService implements OnDestroy {
  private currentUserRole: string = USER_ROLE.GUEST;
  private isLoggedIn: boolean = false;
  private menuDataSubject = new BehaviorSubject<any[]>([]);
  private unsubscribe$ = new Subject<void>();  // For unsubscription

  constructor(
    private authService: AuthService,
    private menuDataService: MenuDataService
  ) {
    this.updateAuthState();

    this.authService.loginStatus$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.updateAuthState();
    });

    this.loadMenuData();
  }

  private loadMenuData() {
    this.menuDataService.getMenuData().pipe(
      tap(data => {
        console.log('Menu data loaded from API:', data);
        this.menuDataSubject.next(data);

        const filteredMenu = this.getFilteredMenu(data);
        console.log('Filtered menu items from menuService:', filteredMenu);
      }),
      catchError(error => {
        console.error('Failed to load menu data:', error);
        return of([]);
      })
    ).subscribe();
  }

  getMenuData(): Observable<any[]> {
    return this.menuDataSubject.asObservable();
  }

  getFilteredMenu(menuData: any[]): any[] {
    if (!menuData || menuData.length === 0) {
      console.log('No menu data available to filter');
      return [];
    }

    return menuData.filter(item => {
      console.log(`Checking menu item: ${JSON.stringify(item)}`);

      const roleAccess = this.checkRoleAccess(item);
      const loginAccess = item.isAvailableWhileLoggedOut || this.isLoggedIn;

      console.log(`Role Access: ${roleAccess}, Login Access: ${loginAccess} for ${item.name}`);

      return roleAccess && loginAccess;
    });
  }


  private updateAuthState() {
    try {
      this.isLoggedIn = this.authService.isUserLoggedIn();
      this.currentUserRole = this.authService.getUserRole();
      console.log(`Auth State Updated - Logged In: ${this.isLoggedIn}, Role: ${this.currentUserRole}`);
    } catch (error) {
      console.error('Error updating auth state:', error);
    }
  }


  private checkRoleAccess(item: any): boolean {
    const roleAccessMap: Record<string, boolean | undefined> = {
      [USER_ROLE.ROLE_MASTER]: item.canMasterAccess,
      [USER_ROLE.ROLE_ADMIN]: item.canAdminAccess,
      [USER_ROLE.ROLE_CUSTOMER]: item.canUserAccess,
      [USER_ROLE.ROLE_SELLER]: item.canSellerAccess,
      [USER_ROLE.ROLE_DOCTOR]: item.canDoctorAccess,
      [USER_ROLE.ROLE_RAIDER]: item.canRiderAccess,
      [USER_ROLE.ROLE_DELIVERY_BOY]: item.canRiderAccess,
      [USER_ROLE.ROLE_CUSTOMER_CARE]: item.canRiderAccess,
      [USER_ROLE.GUEST]: item.canGuestAccess
    };

    const hasAccess = roleAccessMap[this.currentUserRole] ?? false;
    console.log(`Role: ${this.currentUserRole}, Access: ${hasAccess} for item: ${item.name}`);

    return hasAccess;
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
