import { Component, Input, OnInit } from '@angular/core';
import { EmergencyContact } from './../../models/EmergencyContact';
import { EmergencyContactService } from './../../services/emergency-contact.service';

@Component({
  selector: 'app-contant-card',
  templateUrl: './contant-card.component.html',
  styleUrls: ['./contant-card.component.scss'],
})
export class ContantCardComponent implements OnInit {
  @Input() emergency!: EmergencyContact[];
  constructor(private _EmergencyContactService: EmergencyContactService) {}

  ngOnInit(): void {}
  update(item: EmergencyContact) {
    this._EmergencyContactService.updateItem.next(item);
  }
}
