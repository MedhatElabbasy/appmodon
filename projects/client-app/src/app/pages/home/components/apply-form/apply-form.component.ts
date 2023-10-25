import { Component, OnInit } from '@angular/core';
import { Routing } from 'projects/client-app/src/app/modules/core/routes/app-routes';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.scss'],
})
export class ApplyFormComponent implements OnInit {
  constructor() {}
  links = {
    companies: `/${Routing.companies}`,
  };
  ngOnInit() {}
}
