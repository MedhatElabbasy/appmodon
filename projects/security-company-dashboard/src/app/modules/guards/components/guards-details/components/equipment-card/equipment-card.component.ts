import { Component, Input, OnInit } from '@angular/core';
import { companyEquipment } from './../../../../../settings/models/companyEquipment';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss'],
})
export class EquipmentCardComponent implements OnInit {
  @Input('data') data!: companyEquipment;
  constructor() {}

  ngOnInit(): void {
  }
}
