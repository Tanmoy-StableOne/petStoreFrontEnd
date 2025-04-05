import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './layout/side-nav-bar/side-nav-bar.component';
import { VerticalNavBarComponent } from './layout/vertical-nav-bar/vertical-nav-bar.component';
import { MenuService } from './service/menu/menu.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SideNavBarComponent,
    VerticalNavBarComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petStoreFrontEnd';
  menuService = inject(MenuService);
  menuData$ = this.menuService.getMenuData();
}
