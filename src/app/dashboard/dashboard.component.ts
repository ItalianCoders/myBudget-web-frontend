import { Component, OnInit } from '@angular/core';

import { AuthService, User } from '@core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }
}
