import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../../models/clients';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
})
export class GeneralDetailsComponent implements OnInit {
  client!: Client;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.client = this.route.parent?.snapshot.data['client'];
  }
}
