import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MenuService } from '../../service/menu/menu.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../service/auth/Auth.Service';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  standalone: true,
  selector: 'app-side-nav-bar',
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent implements OnInit {
  menuData: any[] = [];
  filteredMenu: any[] = [];
  isExpanded = false;

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to menu data
    this.menuService.getMenuData().subscribe((data) => {
      this.menuData = data;
      this.filterMenu();
    });

    // Subscribe to auth state changes
    this.authService.loginStatus$.subscribe(() => {
      this.filterMenu();
    });
  }

  filterMenu() {
    if (!this.menuData.length) {
      console.warn('No menu data available to filter');
      this.filteredMenu = [];
      return;
    }

    this.filteredMenu = this.menuService.getFilteredMenu(this.menuData);
    console.log('Filtered menu items:', this.filteredMenu);
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSubMenu(item: any) {
    item.isExpanded = !item.isExpanded;
  }

  hasSubMenu(item: any): boolean {
    return item.listOfSubMenu && item.listOfSubMenu.length > 0;
  }
}
