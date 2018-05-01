import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService as SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map } from 'rxjs/operators';

const API_URL = 'https://floating-ravine-25522.herokuapp.com/public/v1';

export { SocialUser } from 'angularx-social-login';

export interface User {
  alias: string;
  firstname: string;
  lastname: string;
  socialType: number;
  username: string;
}

export interface Accounts {
  id: string;
  name: string;
  numberOfUsers: number;
  status: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  accounts: Array<Accounts>;
}

@Injectable()
export class AuthService {
  public user: User;
  private loggedIn: BehaviorSubject<boolean>;

  public get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialService,
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(this.checkLogin());
    this.isLoggedIn.subscribe(
      res => this.router.navigate(['/'], { replaceUrl: true }));
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
      .post<LoginResponse>(`${API_URL}/login`, { username, password })
      .pipe(
        map((res: any) => {
          if (res.accessToken && res.user) {
            this.store('app_token', res.accessToken);
            this.store('user', res.user);
            this.user = res.user;
            this.loggedIn.next(true);
            return res;
          }

          return Observable.throw('accessToken or user missing.');
        }),
      );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: SocialUser) => {
        console.log(res);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => {
        localStorage.clear();
        this.user = null;
        this.loggedIn.next(false);
      })
      .catch(err => {
        localStorage.clear();
        this.user = null;
        this.loggedIn.next(false);
      });
  }

  private store(tag: string, data: any): void {
    const obj = {};
    obj[tag] = data;

    localStorage.setItem(tag, JSON.stringify(obj));
  }
}
