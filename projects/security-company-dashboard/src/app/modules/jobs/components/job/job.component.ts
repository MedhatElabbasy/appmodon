import { Component, OnInit } from '@angular/core';
import { JobRoutesList } from '../../routes/jobs-routes.enum';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  links = [...JobRoutesList];
  constructor() {}

  ngOnInit(): void {}
}
