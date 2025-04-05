import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './service/menu/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petStoreFrontEnd';
  menuService = inject(MenuService);
  menuData$ = this.menuService.getMenuData();
}
