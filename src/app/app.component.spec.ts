import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let AuthServiceStub: Partial<AuthService>;

  AuthServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        MatIconRegistry,
        {provide: AuthService, useValue: AuthServiceStub },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have as title 'myBudget'`, async(() => {
    expect(comp.title).toEqual('myBudget');
  }));

  it('should render title in a span tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.title').textContent)
      .toContain('myBudget');
  }));
});
