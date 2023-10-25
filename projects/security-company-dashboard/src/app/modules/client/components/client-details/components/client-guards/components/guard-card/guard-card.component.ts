import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GuardLocation } from 'projects/security-company-dashboard/src/app/modules/client/models/guard-location';
import { ClientSiteService } from 'projects/security-company-dashboard/src/app/modules/client/services/client-site.service';
import { ModalService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-guard-card',
  templateUrl: './guard-card.component.html',
  styleUrls: ['./guard-card.component.scss'],
})
export class GuardCardComponent implements OnInit {
  @Input('guard') guard!: GuardLocation;
  @Output('update') update = new EventEmitter();
  deleteCanvas = 'delete-canvas';

  constructor(
    public modal: ModalService,
    private siteService: ClientSiteService
  ) {}

  ngOnInit(): void {
    this.deleteCanvas = this.deleteCanvas + '-' + crypto.randomUUID();
  }

  delete() {
    this.siteService.deleteGuardFromLocation(this.guard.id).subscribe((res) => {
      this.modal.close(this.deleteCanvas);
      this.update.emit();
    });
  }
}
