import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthenticationModule { }
