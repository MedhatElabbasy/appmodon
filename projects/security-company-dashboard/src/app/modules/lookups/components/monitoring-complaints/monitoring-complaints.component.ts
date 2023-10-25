import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from '../../../core/routes/app-routes';
import { LookupsRoutes } from '../../routes/lookup-routes';
@Component({
  selector: 'app-monitoring-complaints',
  templateUrl: './monitoring-complaints.component.html',
  styleUrls: ['./monitoring-complaints.component.scss'],
})
export class MonitoringComplaintsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  
}
