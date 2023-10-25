import { Component, OnInit } from '@angular/core';
import { EmergencyContactService } from '../../services/emergency-contact.service';
import { EmergencyContact } from './../../models/EmergencyContact';

@Component({
  selector: 'app-emergency-contact-list',
  templateUrl: './emergency-contact-list.component.html',
  styleUrls: ['./emergency-contact-list.component.scss'],
})
export class EmergencyContactListComponent implements OnInit {
  EmergencyContacts!: EmergencyContact[];
  constructor(private _EmergencyContactService: EmergencyContactService) {}

  ngOnInit(): void {
    this.getAllEmergencyContent();
    this._EmergencyContactService.addItem.subscribe(() => {
      if (this._EmergencyContactService.addItem.getValue()) {
        this.getAllEmergencyContent();
        this._EmergencyContactService.addItem.next(null);
      }
    });
  }
  getAllEmergencyContent() {
    this._EmergencyContactService.getAll().subscribe((res) => {
      this.EmergencyContacts = res;
    });
  }
}
