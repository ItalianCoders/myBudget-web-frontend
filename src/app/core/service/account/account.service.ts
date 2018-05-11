import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  public getUserAccounts(): Observable<Array<Account>> {
    return this.http
      .get<Array<Account>>(`${this.authService.getConfig().ApiUrl}/protected/v1/accounts`);
  }
}
