import { Component, enableProdMode } from '@angular/core';
import { LangService, ModalService } from 'projects/tools/src/public-api';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorService } from 'projects/tools/src/lib/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'security-company-dashboard';
  message: string = '';
  modalId = 'error';
  constructor(
    private lang: LangService,
    private auth: AuthService,
    private _ErrorService: ErrorService,
    private modal: ModalService
  ) {
    this._ErrorService.error.subscribe((res) => {
      this.message = res;
      modal.open(this.modalId);
    });
    this.auth.autoLogin();
    this.lang.checkLang();
  }
}
