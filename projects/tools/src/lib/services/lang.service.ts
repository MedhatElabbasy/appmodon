import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { language } from '../enums/language.enum';
import { StorageKeys } from '../keys/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  language!: BehaviorSubject<string>;
  currentLang!: string;
  public isAr!: BehaviorSubject<boolean>;

  constructor(private translate: TranslateService) {
    this.language = new BehaviorSubject<string>(language.default);
    this.isAr = new BehaviorSubject<boolean>(true);
  }
  getCurrentLanguage() {
    let lang = localStorage.getItem(StorageKeys.lang)!;

    this.language.next(lang);
    return this.language.asObservable();
  }
  checkLang() {
    let currentLang = localStorage.getItem(StorageKeys.lang);
    if (currentLang) {
      this.changeLang(currentLang);
    } else {
      this.changeLang(language.default);
    }
  }

  changeLang(lang: string) {
    let flag = lang == language.ar ? true : false;
    this.isAr.next(flag);
    this.translate.use(lang);
    this.language.next(lang);
    this.currentLang = lang;
    localStorage.setItem(StorageKeys.lang, lang);
    this.changeDocumentAttr(lang);
  }
  toggleLanguage() {
    if (this.currentLang === language.ar) {
      this.changeLang(language.en);
    } else {
      this.changeLang(language.ar);
    }
    location.reload();
  }
  changeDocumentAttr(lang: string) {
    let dir = lang === language.ar ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('class', lang);
  }
}
