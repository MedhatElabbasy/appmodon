import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangService } from 'projects/tools/src/public-api';
import { ComplaintsService } from '../../services/complaints.service';

@Component({
  selector: 'app-infraction-details',
  templateUrl: './infraction-details.component.html',
  styleUrls: ['./infraction-details.component.scss']
})
export class InfractionDetailsComponent implements OnInit {

  id: string = '';
  infraction: any;

  constructor(
    private route: ActivatedRoute,
    private _ComplaintsService: ComplaintsService,
    public lang: LangService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.route.queryParams.subscribe((res) => {
      this.id = res['id'];
      this._ComplaintsService.getDetails(this.id).subscribe((data) => {
        this.infraction = data;
      });
    });

  }

}
