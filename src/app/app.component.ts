import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService, SocialUser } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry } from '@angular/material/icon';
import { Subscription } from 'rxjs/Subscription';
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	private popupOpenSubscription: Subscription;
	private popupCloseSubscription: Subscription;
	private initializeSubscription: Subscription;
	private statusChangeSubscription: Subscription;
	private revokeChoiceSubscription: Subscription;

	title = 'myBudget';
	isLoggedIn$: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private domSanitizer: DomSanitizer,
		private matIconRegistry: MatIconRegistry,
		private ccService: NgcCookieConsentService
	) {
		this.matIconRegistry.addSvgIcon(
			`facebook_icon`,
			domSanitizer.bypassSecurityTrustResourceUrl('../assets/fb.svg')
		);
		this.matIconRegistry.addSvgIcon(
			`google_icon`,
			domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg')
		);
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.authService.isLoggedIn;

		// subscribe to cookieconsent observables to react to main events
		this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
			() => {
				// you can use this.ccService.getConfig() to do stuff...
			}
		);

		this.initializeSubscription = this.ccService.initialize$.subscribe(
			(event: NgcInitializeEvent) => {
				// you can use this.ccService.getConfig() to do stuff...
			}
		);

		this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
			(event: NgcStatusChangeEvent) => {
				// you can use this.ccService.getConfig() to do stuff...
			}
		);

		this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
			() => {
				// you can use this.ccService.getConfig() to do stuff...
			}
		);
	}

	ngOnDestroy() {
		// unsubscribe to cookieconsent observables to prevent memory leaks
		this.popupOpenSubscription.unsubscribe();
		this.popupCloseSubscription.unsubscribe();
		this.initializeSubscription.unsubscribe();
		this.statusChangeSubscription.unsubscribe();
		this.revokeChoiceSubscription.unsubscribe();
	}

	logOut(): void {
		this.authService.signOut();
	}
}
