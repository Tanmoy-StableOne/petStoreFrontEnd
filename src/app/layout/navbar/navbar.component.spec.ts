import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { AuthService } from '../../service/auth/Auth.Service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserRole: jasmine.createSpy('getUserRole').and.returnValue('ADMIN')
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NavbarComponent],  // ✅ Import RouterModule
      providers: [{ provide: AuthService, useValue: mockAuthService }]  // ✅ Provide mock AuthService
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
