import { Injectable } from '@angular/core';
import { AuthService, User } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: string;
  type: number;
  value: string;
  isEditable: boolean;
  iconId: number;
}

export interface Movement {
  id: string;
  type: number;
  amount: number;
  executedBy: User;
  executedAt: number;
  uptadedAt: number;
  note: string;
  category: Category;
  auto: boolean;
}

export interface AccountDetails extends Account {
  incomingCategoriesAvailable: Array<Category>;
  expenseCategoriesAvailable: Array<Category>;
  totalMonthlyIncoming: number;
  totalMonthlyExpense: number;
  incomingOverviewMovement: Map<string, number>;
  expenseOverviewMovement: Map<string, number>;
  lastMovements: Array<Movement>;
  members: Array<User>;
  administrators: Array<String>;
  numberOfPendingAccountInvites: number;
}

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
  public getAccountDetails(accountId: string): Observable<AccountDetails> {
    return this.http
    .get<AccountDetails>(`${this.authService.getConfig().ApiUrl}/protected/v1/accounts/${accountId}`);
  }

}
