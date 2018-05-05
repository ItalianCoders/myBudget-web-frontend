import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  SocialLoginModule,
  SocialService,
  ServiceConfigProviders,
} from './socialModule';

import { AuthService, AuthConfig } from './auth.service';
import { promise } from 'protractor';

describe('AuthService', () => {
  let service: AuthService;
  let socialServiceMock: SocialServiceMock;
  let mockLocalStorage;

  class SocialServiceMock {
    responseStatus: boolean;

    signOut() {
      return this.responseStatus
        ? Promise.resolve()
        : Promise.reject('err');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        { provide: SocialService, useClass: SocialServiceMock },
        { provide: AuthConfig, useValue: '' }
      ],
    });

    service = TestBed.get(AuthService);
    socialServiceMock = TestBed.get(SocialService);
  });

  beforeEach(() => {
    let store = {};

    mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);

    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);

    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);

    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('checkLogin should return false when `app_token` is not ' +
  'present in the localStorage', () => {
    const response = service.checkLogin();

    expect(localStorage.getItem).toHaveBeenCalledWith('app_token');
    expect(localStorage.getItem).not.toHaveBeenCalledWith('user');

    expect(response).toEqual(false);
  });

  it('checkLogin should return false when `app_token` is ' +
  'present in the localStorage but `user` is not', () => {
    mockLocalStorage.setItem('app_token', 'allo');

    const response = service.checkLogin();

    expect(localStorage.getItem).toHaveBeenCalledWith('app_token');
    expect(localStorage.getItem).toHaveBeenCalledWith('user');

    expect(response).toEqual(false);
  });

  it('checkLogin should return true when both `app_token` and ' +
  '`user` are present in the localStorage', () => {
    mockLocalStorage.setItem('app_token', 'allo');
    mockLocalStorage.setItem('user', 'test-user');

    const response = service.checkLogin();

    expect(localStorage.getItem).toHaveBeenCalledWith('app_token');
    expect(localStorage.getItem).toHaveBeenCalledWith('user');

    expect(response).toEqual(true);
  });

  it('signOut should clear the localStorage and reset the user object',
  fakeAsync(() => {
    const mockUser = {
      alias: 'fake signed in user',
      firstname: 'user',
      lastname: 'user',
      socialType: 1,
      username: 'fakeUser',
    };

    service.user = mockUser;
    socialServiceMock.responseStatus = true;

    expect(service.user).toEqual(mockUser);

    service.signOut();
    tick();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(service.user).toBeNull();
  }));
});
