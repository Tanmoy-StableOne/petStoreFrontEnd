import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/Auth.Service';
import { exampleMenu } from '../../constants/ExamplMenu';
import { USER_ROLE } from '../../constants/Enums';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: any[] = [];
  userRole: string = '';
  isExpanded = false;
  openSubMenu: string | null = null;
  currentRoute = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isExpanded = window.innerWidth > 768;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  handleItemClick(item: any, event: Event): void {
    if (item.listOfSubMenu?.length) {
      event.preventDefault();
      console.log('Toggling submenu for:', item.id);
      this.toggleSubMenu(item.id);
    }
    // For items with both menuLink and submenus
    if (item.menuLink && !item.listOfSubMenu?.length) {
      this.router.navigate([item.menuLink]);
    }
  }

  toggleSubMenu(menuId: string): void {
    this.openSubMenu = this.openSubMenu === menuId ? null : menuId;
  }

  isActive(path: string): boolean {
    return path ? this.currentRoute.includes(path) : false;
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.menu = this.filterMenu(exampleMenu);
  }

  ngAfterViewInit() {
    console.log('Filtered menu:', this.menu);
    this.menu.forEach(item => {
      if (item.listOfSubMenu) {
        console.log(`Menu "${item.menuName}" has ${item.listOfSubMenu.length} subitems`);
      }
    });
  }

  filterMenu(menu: any[]): any[] {
    return menu
      .filter(item => this.hasAccess(item))
      .map(item => ({
        ...item,
        listOfSubMenu: item.listOfSubMenu ? this.filterMenu(item.listOfSubMenu) : null
      }));
  }

  hasAccess(item: any): boolean {
    switch (this.userRole) {
      case USER_ROLE.ROLE_ADMIN: return item.canAdminAccess;
      case USER_ROLE.ROLE_CUSTOMER: return item.canUserAccess;
      case USER_ROLE.ROLE_DOCTOR: return item.canDoctorAccess;
      case USER_ROLE.ROLE_SELLER: return item.canSellerAccess;
      case USER_ROLE.ROLE_RAIDER: return item.canRiderAccess;
      case USER_ROLE.ROLE_MASTER: return item.canMasterAccess;
      case USER_ROLE.GUEST: return item.isVisibleToGuest;
      default: return false;
    }
  }
}
