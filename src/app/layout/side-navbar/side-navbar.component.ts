import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;
  userRole = '';
  isExpanded = true;
  private subscriptions: Subscription[] = [];

  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {
    // Emit initial state
    this.sidebarCollapsed.emit(!this.isExpanded);
  }

  ngOnInit(): void {
    this.loadMenuItems();
    
    this.subscriptions.push(
      this.authService.loginStatus$.subscribe(status => {
        this.isLoggedIn = status;
        this.loadMenuItems();
      })
    );
    
    this.subscriptions.push(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
        this.loadMenuItems();
      })
    );
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarCollapsed.emit(!this.isExpanded);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadMenuItems(): void {
    this.subscriptions.push(
      this.menuService.getMenuItems().subscribe(items => {
        this.menuItems = items;
      })
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // The service will handle the redirect
      },
      error: (error) => {
        // Force redirect to login page even on error
        window.location.href = '/login';
      }
    });
  }
}
