import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MenuService } from '../../service/menu/menu.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-normal-nav-bar',
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './vertical-nav-bar.component.html',
  styleUrls: ['./vertical-nav-bar.component.css']
})
export class VerticalNavBarComponent implements OnInit {
  @Input() menuData: any[] = [];
  filteredMenu: any[] = [];
  isMobileMenuOpen = false;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.filteredMenu = this.menuService.getFilteredMenu(this.menuData);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  hasSubMenu(item: any): boolean {
    return item.listOfSubMenu && item.listOfSubMenu.length > 0;
  }
}
