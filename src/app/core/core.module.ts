import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { AuthGuard } from './auth.guard';
import { AuthService, AuthConfig, AuthTokenConfig } from './auth.service';
import { SocialLoginModule, SocialService } from './socialModule';
import { environment } from '@env';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SocialLoginModule.forRoot(environment.socialConfig),
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
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
        SocialService,
        { provide: AuthConfig, useValue: config }
      ],
    };
  }
}
