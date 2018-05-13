import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env';

import { AuthGuard } from './guard';
import { AuthService, AuthConfig, AuthTokenConfig } from './auth';
import { SocialLoginModule, SocialService } from './socialModule';
import { TokenInterceptorService } from './token-interceptor';
import { AccountService } from './account';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SocialLoginModule.forRoot(environment.socialConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SocialLoginModule,
    TranslateModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.'
        + 'Import Core modules in the AppModule only.');
    }
  }

  public static forRoot(config: AuthTokenConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AuthGuard,
        AccountService,
        SocialService,
        { provide: AuthConfig, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        }
      ],
    };
  }
}
