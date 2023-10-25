import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from 'projects/client-app/src/app/pages/companies/companies.service';
//import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-guard-card',
  templateUrl: './guard-card.component.html',
  styleUrls: ['./guard-card.component.scss']
})
export class GuardCardComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes =[5, 10, 20, 30];
  id!:any;
  guards!:any;
  constructor(private route: ActivatedRoute , private company:CompaniesService  ) { 
    this.route.params.subscribe((res:any)=>{
      console.log(res.id);
      this.id=res.id;
      this.getGuardsData();
    });
    
    
  }

  ngOnInit(): void {
  }
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(_pageNumber: number) {
    this.pageNumber = _pageNumber;
  }

  getGuardsData(){
   this.company.getAllLocationsById(this.id).subscribe((res:any)=>{
    console.log(res);
    this.guards = res;
    console.log(res);
    
    this.total = res.length;
    console.log(this.guards.length);
    
   });
  }

}
