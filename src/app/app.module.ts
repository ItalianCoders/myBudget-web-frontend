import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { CookieLawModule } from 'angular2-cookie-law';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material.module';

const provideConfig = () => environment.socialConfig;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SocialLoginModule,
    MaterialModule,
    CookieLawModule
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: provideConfig },
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
