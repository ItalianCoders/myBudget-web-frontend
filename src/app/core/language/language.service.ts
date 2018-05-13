import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translateService: TranslateService) { }

  public init() {
    this.translateService.addLangs(['en', 'it']);
    this.translateService.setDefaultLang('it');
  }

  public setLanguage(language: string) {
    this.translateService.use(language);
  }

  public getLanguage(): string {
    return this.translateService.currentLang;
  }
}
