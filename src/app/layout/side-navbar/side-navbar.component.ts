import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../service/menu/menu.service';
import { MenuItem } from '../../interfaces/menu.interface';
import { AuthService } from '../../service/auth/Auth.Service';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;
  userRole = '';
  isExpanded = false;

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
    this.menuService.getMenuItems().subscribe(items => {
      this.menuItems = items;
    });
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  logout(): void {
    this.authService.logout();
  }
}
