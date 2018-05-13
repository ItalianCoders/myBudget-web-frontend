import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, LanguageService } from '@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
  ) {
    this.title = 'myBudget';
    this.languageService.init();
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public logOut(): void {
    this.authService.signOut();
  }
}
