import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(6) ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ],
    });

    console.log(this.loginForm.get('username'));
  }

}
