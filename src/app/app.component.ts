import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { AuthService } from './service/auth/Auth.Service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, SideNavbarComponent],
  template: `
    <!-- Top Navbar for guests -->
    <div *ngIf="!useSideNavbar">
      <app-navbar></app-navbar>
    </div>

    <!-- Side Navbar for logged-in users -->
    <div *ngIf="useSideNavbar">
      <app-side-navbar></app-side-navbar>
    </div>

    <!-- Main content -->
    <main [class.with-side-navbar]="useSideNavbar">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'petStoreFrontEnd';
  useSideNavbar = false;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      this.useSideNavbar = status;
    });
  }
}
