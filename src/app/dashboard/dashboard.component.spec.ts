import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService, AccountService } from '@core';
import { DashboardComponent } from './dashboard.component';
import { Observable } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  class AccountServiceMock {
    public getAccountDetails(accountId: string): Observable<any> {
      const mockAccount = {};

      return Observable.create(observer => {
        if (accountId) {
          observer.next(mockAccount);
          return observer.complete();
        }

        observer.console.error();
      });
    }
  }

  class AuthServiceMock {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AccountService, useClass: AccountServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
