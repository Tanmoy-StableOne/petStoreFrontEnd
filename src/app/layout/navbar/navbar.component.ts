import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';
import { MenuItem } from '../../interfaces/menu.interface';
import { AuthService } from '../../service/auth/Auth.Service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;
  userRole = '';
  isMobileMenuOpen = false;
  activeSubmenuId: string | null = null;

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
    this.authService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.loadMenuItems();
    });
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.loadMenuItems();
    });
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
    
    // For mobile view
    if (window.innerWidth <= 768) {
      this.activeSubmenuId = this.activeSubmenuId === itemId ? null : itemId;
    }
    // For desktop view with click navigation
    else if (!this.hasSubmenuOpen()) {
      this.activeSubmenuId = itemId;
    }
  }

  hasSubmenuOpen(): boolean {
    return this.activeSubmenuId !== null;
  }

  isSubmenuActive(itemId: string): boolean {
    return this.activeSubmenuId === itemId;
  }

  closeMenu(): void {
    this.isMobileMenuOpen = false;
    this.activeSubmenuId = null;
  }

  logout(): void {
    this.authService.logout();
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
}
