import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '@core';

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
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.createForm();

    this.loginForm.valueChanges.subscribe(res => this.loginError = false);
  }

  public onRegister(): void {
    this.router.navigate(['/register']);
  }

  public signInWithEmail(user: FormGroup): void {
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

  public signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public signInWithFB(): void {
    this.authService.signInWithFB();
  }

  public signOut(): void {
    this.authService.signOut();
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

  private createForm() {
    this.loginForm = this.fb.group({
      username: [
        '', [ Validators.required, Validators.minLength(4) ]
      ],
      password: [
        '', [ Validators.required, Validators.minLength(4) ]
      ],
    });
  }
}
