import { Injectable } from '@angular/core';
import { AuthService, Account } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails } from './interfaces';

export * from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  public getUserAccounts(): Observable<Array<Account>> {
    return this.http
      .get<Array<Account>>(`${this.authService.getConfig().ApiUrl}/protected/v1/accounts`);
  }

  public getAccountDetails(accountId: string): Observable<AccountDetails> {
    return this.http
    .get<AccountDetails>(`${this.authService.getConfig().ApiUrl}/protected/v1/accounts/${accountId}`);
  }
}
