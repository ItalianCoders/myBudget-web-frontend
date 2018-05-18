import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';

import { environment } from '@env';

import { CoreModule, AuthTokenConfig } from '@core';
import { SharedModule } from '@shared';
import { AuthenticationModule } from './authentication/authentication.module';
import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { NotFoundComponent } from './not-found/not-found.component';

registerLocaleData(localeIt, 'it');

const authTokenConfig: AuthTokenConfig = {
  ApiUrl: environment.ApiUrl,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DummyComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(authTokenConfig),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
