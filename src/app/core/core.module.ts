import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from '@env';

import { AuthGuard } from './guard';
import { AuthService, AuthTokenConfig, AuthConfig } from './auth';
import { SocialLoginModule, SocialService } from './socialModule';
import { TokenInterceptorService } from './token-interceptor';
import { AccountService } from './account';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule.forRoot(environment.socialConfig),
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
