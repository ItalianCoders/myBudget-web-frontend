import {Inject, Injectable} from '@angular/core';
import {AuthConfig, AuthTokenConfig} from '@core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(@Inject(AuthConfig) private config: AuthTokenConfig,
              private http: HttpClient) {
  }

  public getUserAccounts(): Observable<Array<Account>> {
    return this.http
      .get<Array<Account>>(`${this.config.ApiUrl}/protected/v1/accounts`);
  }
}
