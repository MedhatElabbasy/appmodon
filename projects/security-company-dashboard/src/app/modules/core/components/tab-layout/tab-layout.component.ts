import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.scss'],
})
export class TabLayoutComponent implements OnInit {
  @Input('list') list!: MenuItem[];
  constructor() {}

  ngOnInit() {}
}
