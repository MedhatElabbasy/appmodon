import { Component, Input, OnInit } from '@angular/core';
import { LangService } from 'projects/tools/src/public-api';
import { Shift } from '../../../../models/shift';

@Component({
  selector: 'app-shift-card',
  templateUrl: './shift-card.component.html',
  styleUrls: ['./shift-card.component.scss'],
})
export class ShiftCardComponent implements OnInit {
  @Input('shift') shift!: Shift;

  constructor(public lang: LangService) {}

  ngOnInit(): void {}
}
