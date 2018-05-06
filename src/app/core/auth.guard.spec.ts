import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: AuthServiceStub;

  @Component({
    selector: 'app-login',
    template: `<div>Login</div>`,
  })
  class LoginComponent {}

  @Component({
    selector: 'app-dashboard',
    template: `<div>Dashboard</div>`,
  })
  class DashboardComponent {}

  class AuthServiceStub {
    loggedIn: BehaviorSubject<boolean>;

    get isLoggedIn(): Observable<boolean> {
      return this.loggedIn.asObservable();
    }

    constructor() {
      this.loggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        LoginComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        ]),
      ],
      providers: [
        AuthGuard,
        {provide: AuthService, useClass: AuthServiceStub },
      ]
    });

    guard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);

    router.initialNavigation();
  });

  it('a guard should be defined', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to the login page when the user is logged out',
  fakeAsync(() => {
    authService.loggedIn.next(false);
    router.navigate(['']);

    tick();

    spyOn(router, 'navigate');

    guard.canActivate().subscribe(res => {
      expect(res).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  }));

  it('should allow navigating to the dashboard when the user is logged in',
  fakeAsync(() => {
    authService.loggedIn.next(true);
    router.navigate(['/dashboard']);

    tick();

    spyOn(router, 'navigate');

    guard.canActivate().subscribe(res => {
      expect(res).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  }));

  it('navigating to the dashboard should redirect to /login when the user ' +
  'is not authenticated', fakeAsync(() => {
    authService.loggedIn.next(false);
    router.navigate(['/dashboard']);

    tick();

    spyOn(router, 'navigate');

    guard.canActivate().subscribe(res => {
      expect(res).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  }));
});
