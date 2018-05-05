import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SocialUser, LoginResponse } from '../auth.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
    ) {
        this.submitting = false;
        this.loginError = false;
     }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(res => this.loginError = false);
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

    private enableFormControl(name: string, value: boolean) {
        if (value) {
            this.loginForm.controls[name].enable();
        } else {
            this.loginForm.controls[name].disable();
        }
    }
}
