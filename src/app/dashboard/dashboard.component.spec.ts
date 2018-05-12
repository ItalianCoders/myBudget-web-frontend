import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService, AccountService} from '@core';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  class AuthServiceMock {}
  class AccountServiceMock {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
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
