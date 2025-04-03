import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // ✅ Fix this (was "styleUrl")
})
export class AppComponent {
  title = 'petStoreFrontEnd';
}
