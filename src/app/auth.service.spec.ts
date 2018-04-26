import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

import { AuthService as AuthenticationService } from './auth.service';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  },
]);

xdescribe('AuthService', () => {
  let service: AuthenticationService;

  const provideConfig = () => config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SocialLoginModule,
        { provide: AuthServiceConfig, useFactory: provideConfig },
      ],
      providers: [
        AuthenticationService,
      ]
    });
  });

  it('should use AuthService', () => {
    service = TestBed.get(AuthenticationService);
    expect(service.checkLogin()).toBeFalsy();
  });
});
