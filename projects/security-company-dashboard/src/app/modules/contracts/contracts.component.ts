import { Component, OnInit } from '@angular/core';
import { ContractsRoutesList } from './routes/contracts-routes';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  list = [...ContractsRoutesList];
  constructor() {}

  ngOnInit(): void {}
}
