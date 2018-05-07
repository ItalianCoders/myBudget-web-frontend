import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor( private translateService: TranslateService ) { }

  init() {
    this.translateService.addLangs(['en', 'it']);
    this.translateService.setDefaultLang('it');
  }

  setLanguage(language: string) {
    this.translateService.use(language);
  }

  getLanguage(): string {
    return this.translateService.currentLang;
  }
}
