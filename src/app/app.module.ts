import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { environment } from '../environments/environment';
import {
	NgcCookieConsentModule,
	NgcCookieConsentConfig
} from 'ngx-cookieconsent';

import { AppRoutingModule } from './app.routing';

import {
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatProgressSpinnerModule
} from '@angular/material';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const provideConfig = () => environment.socialConfig;

const cookieConfig: NgcCookieConsentConfig = {
	cookie: {
		domain: 'http://www.mubudget.tk/'
	},
	position: 'bottom-left',
	theme: 'classic',
	palette: {
		popup: {
			background: '#000000',
			text: '#ffffff',
			link: '#ffffff'
		},
		button: {
			background: '#f1d600',
			text: '#000000',
			border: 'transparent'
		}
	},
	type: 'info',
	content: {
		message:
			'This website uses cookies to ensure you get the best experience on our website.',
		dismiss: 'Got it!',
		deny: 'Refuse cookies',
		link: 'Learn more',
		href: 'https://cookiesandyou.com'
	}
};

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		SocialLoginModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatProgressSpinnerModule,
		NgcCookieConsentModule.forRoot(cookieConfig)
	],
	providers: [
		{ provide: AuthServiceConfig, useFactory: provideConfig },
		AuthService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
