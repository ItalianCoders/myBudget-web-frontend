import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  AccountDetails,
  AccountService,
  User,
} from '@core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User;
  public account: AccountDetails;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) { }

  public ngOnInit() {
    this.user = this.authService.user;

    this.accountService.getAccountDetails(this.authService.currentAccount)
      .subscribe(
        response => this.account = response,
        error => this.authService.signOut(error));
  }
}
