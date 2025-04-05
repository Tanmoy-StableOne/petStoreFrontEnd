import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MenuItem } from '../../interfaces/menu.interface';
import { AuthService } from '../auth/Auth.Service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:8084/navbar/get';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMenuItems(): Observable<MenuItem[]> {
    console.log('Fetching menu items from API...');
    return this.http.get<MenuItem[]>(this.apiUrl).pipe(
      tap(items => console.log('API Response:', items)),
      map(menuItems => this.filterMenuItemsByRole(menuItems)),
      tap(filteredItems => console.log('Filtered menu items:', filteredItems)),
      catchError(error => {
        console.error('Error fetching menu items:', error);
        return of([]);
      })
    );
  }

  private filterMenuItemsByRole(menuItems: MenuItem[]): MenuItem[] {
    const userRole = this.authService.getStoredUserRole();
    const isLoggedIn = this.authService.isUserLoggedIn();
    
    console.log('Filtering menu items - User Role:', userRole, 'Is Logged In:', isLoggedIn);
    
    return menuItems.filter(item => {
      // First, check if the item itself should be visible
      let hasAccess = this.checkAccess(item, userRole, isLoggedIn);
      
      // If the item has submenus, filter them
      if (item.listOfSubMenu && item.listOfSubMenu.length > 0) {
        item.listOfSubMenu = this.filterMenuItemsByRole(item.listOfSubMenu);
        // Keep parent if it has visible submenu items, even if parent itself doesn't have access
        hasAccess = hasAccess || item.listOfSubMenu.length > 0;
      }
      
      return hasAccess;
    });
  }

  private checkAccess(item: MenuItem, userRole: string, isLoggedIn: boolean): boolean {
    if (!isLoggedIn) {
      return item.isAvailableWhileLoggedOut && item.isVisibleToGuest;
    }

    switch (userRole) {
      case 'ROLE_MASTER':
        return item.canMasterAccess;
      case 'ROLE_ADMIN':
        return item.canAdminAccess;
      case 'ROLE_CUSTOMER':
        return item.canUserAccess;
      case 'ROLE_DOCTOR':
        return item.canDoctorAccess;
      case 'ROLE_SELLER':
        return item.canSellerAccess;
      case 'ROLE_RIDER':
        return item.canRiderAccess;
      case 'ROLE_CHAT_USER':
        return item.chatUsersAccess;
      default:
        return false;
    }
  }
} 