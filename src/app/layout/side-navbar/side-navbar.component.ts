import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';
import { MenuItem } from '../../interfaces/menu.interface';
import { AuthService } from '../../service/auth/Auth.Service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;
  userRole = '';
  isExpanded = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log('SideNavbar: Initializing component');
    this.loadMenuItems();
    
    this.subscriptions.push(
      this.authService.loginStatus$.subscribe(status => {
        console.log('SideNavbar: Login status changed:', status);
        this.isLoggedIn = status;
        this.loadMenuItems();
      })
    );
    
    this.subscriptions.push(
      this.authService.userRole$.subscribe(role => {
        console.log('SideNavbar: User role changed:', role);
        this.userRole = role;
        this.loadMenuItems();
      })
    );
  }

  ngOnDestroy(): void {
    console.log('SideNavbar: Destroying component');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadMenuItems(): void {
    console.log('SideNavbar: Loading menu items');
    this.menuService.getMenuItems().subscribe(items => {
      console.log('SideNavbar: Menu items loaded:', items);
      this.menuItems = items;
    });
  }

  toggleExpand(): void {
    console.log('SideNavbar: Toggling expand state');
    this.isExpanded = !this.isExpanded;
  }

  logout(): void {
    console.log('SideNavbar: Logout button clicked');
    this.authService.logout().subscribe({
      next: () => {
        console.log('SideNavbar: Logout successful');
        // The service will handle the redirect
      },
      error: (error) => {
        console.error('SideNavbar: Logout error:', error);
        // Force redirect to login page even on error
        window.location.href = '/login';
      }
    });
  }
}
