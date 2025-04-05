import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SideNavbarComponent
  ],
  template: `
    <div>
      <h1>Test Component</h1>
      <app-navbar></app-navbar>
      <app-side-navbar></app-side-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class TestComponent {
  title = 'Test Component';
} 