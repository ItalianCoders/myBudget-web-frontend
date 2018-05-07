import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SocialUser, LoginResponse } from '@core';
import { LanguageService } from '@app/core/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitting: boolean;
  public loginError: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
  ) { }

  public ngOnInit() {
    this.createForm();

    this.loginForm.valueChanges.subscribe(res => this.loginError = false);
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4) ] ],
      password: ['', [ Validators.required, Validators.minLength(4) ] ],
    });
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  signInWithEmail(user: FormGroup): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = user.value.username;
    const password = user.value.password;

    this.submitting = true;
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();

    this.authService.signInWithEmail(username, password)
      .subscribe(
        res => this.handleLoginSuccess(res),
        err => this.handleLoginError(err),
      );
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  signInWithFB(): void {
    this.authService.signInWithFB();
  }

  signOut(): void {
    this.authService.signOut();
  }

  changeLang() {
    const lang = this.languageService.getLanguage();
    if (lang === 'it') {
      this.languageService.setLanguage('en');
    } else {
      this.languageService.setLanguage('it');
    }
  }

  private handleLoginSuccess(res: LoginResponse): void {
    this.loginForm.reset();
    this.loginForm.enable();
    this.submitting = false;
  }

  private handleLoginError(err?: any): void {
    this.loginForm.enable();
    this.submitting = false;
    this.loginError = true;
  }
}
