import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';
import { MenuItem } from '../../interfaces/menu.interface';
import { AuthService } from '../../service/auth/Auth.Service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;
  userRole = '';
  username = '';
  isMobileMenuOpen = false;
  activeSubmenuId: string | null = null;
  isMobileView = window.innerWidth <= 768;
  private subscriptions: Subscription[] = [];

  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobileView;
    this.isMobileView = window.innerWidth <= 768;
    
    // Reset states when switching between mobile and desktop
    if (wasMobile !== this.isMobileView) {
      this.isMobileMenuOpen = false;
      this.activeSubmenuId = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMobileView) {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest('.has-submenu')) {
        this.activeSubmenuId = null;
      }
    }
  }

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check initial login state
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.userRole = this.authService.getUserRole();
    this.username = this.authService.getUsername() || this.userRole;
    
    this.loadMenuItems();
    
    // Subscribe to login status changes
    this.subscriptions.push(
      this.authService.loginStatus$.subscribe(status => {
        this.isLoggedIn = status;
        if (status) {
          this.username = this.authService.getUsername() || this.userRole;
        } else {
          this.username = '';
        }
        this.loadMenuItems();
      })
    );
    
    // Subscribe to user role changes
    this.subscriptions.push(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
        if (this.isLoggedIn) {
          this.username = this.authService.getUsername() || role;
        }
        this.loadMenuItems();
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        console.log('Received menu items:', items);
        this.menuItems = items;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
      }
    });
  }

  hasSubmenu(item: MenuItem): boolean {
    return item.listOfSubMenu && item.listOfSubMenu.length > 0;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.activeSubmenuId = null;
    }
  }

  toggleSubmenu(event: Event, itemId: string): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle submenu state
    this.activeSubmenuId = this.activeSubmenuId === itemId ? null : itemId;
  }

  isSubmenuActive(itemId: string): boolean {
    return this.activeSubmenuId === itemId;
  }

  closeMenu(): void {
    this.isMobileMenuOpen = false;
    this.activeSubmenuId = null;
  }

  logout(): void {
    console.log('Navbar logout button clicked');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Navbar: Logout successful');
        // The service will handle the redirect
      },
      error: (error) => {
        console.error('Navbar: Logout error:', error);
        // Force redirect to login page even on error
        window.location.href = '/login';
      }
    });
    this.closeMenu();
  }

  // Debug method to help track menu item structure
  logMenuItem(item: MenuItem): void {
    console.log('Menu Item:', {
      name: item.menuName,
      hasSubmenu: this.hasSubmenu(item),
      subMenuCount: item.listOfSubMenu?.length || 0,
      subMenuItems: item.listOfSubMenu
    });
  }

  navigateToProfile(): void {
    this.router.navigate(['/my-profile']);
  }
}
