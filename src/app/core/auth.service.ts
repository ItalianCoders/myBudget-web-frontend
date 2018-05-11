import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from './socialModule';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export const AuthConfig = new InjectionToken<AuthTokenConfig>('AuthTokenConfig');

export interface AuthTokenConfig {
  ApiUrl: string;
}

export interface User {
  alias: string;
  firstname: string;
  lastname: string;
  socialType: number;
  username: string;
}

export interface Account {
  id: string;
  name: string;
  description: string;
  numberOfUsers: number;
  status: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  accounts: Array<Account>;
}

export enum SocialType {
  None = 0,
  Facebook,
  Google,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;
  private loggedIn: BehaviorSubject<boolean>;

  public get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(
    @Inject(AuthConfig) private config: AuthTokenConfig,
    private http: HttpClient,
    private router: Router,
    private authService: SocialService,
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(this.checkLogin());
    this.isLoggedIn
      .subscribe((res: boolean) => {
        if (res) {
          this.user = null;
          this.user = JSON.parse(localStorage.getItem('user')).user;
          this.router.navigate(['dashboard']);
          return;
        }

        this.router.navigate(['login']);
      });
  }

  checkLogin(): boolean {
    return !!localStorage.getItem('app_token')
      && !!localStorage.getItem('user');
  }

  signInWithEmail(
    username: string,
    password: string,
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.config.ApiUrl}/public/v1/login`, { username, password })
      .pipe(
        map((res: any) => {
          if (res.accessToken && res.user) {
            this.store('app_token', res.accessToken);
            this.store('user', res.user);
            this.user = res.user;
            this.loggedIn.next(true);
            return res;
          }

          return throwError('accessToken or user missing.');
        }),
      );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: SocialUser) => {
        console.log(res);
        this.signIn(res, SocialType.Google);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res: SocialUser) => {
        console.log(res);
        this.signIn(res, SocialType.Facebook);
      });
  }

  signOut(): void {
    this.authService.signOut();

    localStorage.clear();
    this.user = null;
    this.loggedIn.next(false);
  }

  private signIn(socialUser, socialType: SocialType) {
    const payload = {
      username: socialType === SocialType.Facebook ? socialUser.id : socialUser.email,
      password: '*',
      socialAuthenticationType: socialType,
      socialAccessToken: socialUser.authToken,
    };

    return this.http
      .post<LoginResponse>(`${this.config.ApiUrl}/public/v1/login`, payload)
      .subscribe(res => {
        if (res.accessToken && res.user) {
          this.store('app_token', res.accessToken);
          this.store('user', res.user);
          this.user = res.user;
          this.loggedIn.next(true);
        }
      });
  }

  private store(tag: string, data: any): void {
    const obj = {};
    obj[tag] = data;

    localStorage.setItem(tag, JSON.stringify(obj));
  }
}
