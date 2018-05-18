import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';

import { AuthService } from '@core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isLoggedIn$: Observable<boolean>;
  public isHandset: Observable<BreakpointState>;

  @ViewChild('drawer')
  public drawer: MatSidenav;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.title = 'myBudget';
    this.isHandset = this.breakpointObserver.observe(Breakpoints.Handset);
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public logOut(): void {
    this.authService.signOut();
    this.drawer.close();
  }
}
