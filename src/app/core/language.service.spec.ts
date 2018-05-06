import { TestBed, inject } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { TranslateService, TranslateModule, TranslateLoader, TranslateFakeLoader,  } from '@ngx-translate/core';

describe('LanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    });
  });

  it('should be created', inject([LanguageService], (service: LanguageService) => {
    expect(service).toBeTruthy();
  }));
});
