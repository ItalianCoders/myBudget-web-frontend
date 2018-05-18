import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '@env';

import { AuthGuard } from './guard';
import { AuthService, AuthConfig, AuthTokenConfig } from './auth';
import { SocialLoginModule, SocialService } from './socialModule';
import { TokenInterceptorService } from './token-interceptor';
import { AccountService } from './account';

@NgModule({
  imports: [
    SocialLoginModule.forRoot(environment.socialConfig),
  ],
  exports: [
    SocialLoginModule,
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
