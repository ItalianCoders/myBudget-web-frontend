import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';

import { SocialService, ConfigToken, ServiceConfigProviders } from './auth.service';

@NgModule({})
export class SocialLoginModule {
  constructor(@Optional() @SkipSelf() parentModule: SocialLoginModule) {
    if (parentModule) {
      throw new Error(
        'SocialLoginModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: ServiceConfigProviders): ModuleWithProviders {
    return {
      ngModule: SocialLoginModule,
      providers: [
        SocialService,
        { provide: ConfigToken, useValue: config }
      ]
    };
  }
}
