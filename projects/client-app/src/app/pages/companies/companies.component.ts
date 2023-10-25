import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SecurityCompany } from 'projects/tools/src/lib/models/security-company';
import { PAGINATION_SIZES } from 'projects/tools/src/public-api';
import {
  CanvasService,
  LangService,
  Lookup,
  Pagination,
} from 'projects/tools/src/public-api';
import { CompaniesService } from './companies.service';
import { AuthService } from '../../modules/auth/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  companies!:any| SecurityCompany[];
  company!:SecurityCompany[]
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  services!: Lookup[];
  searchKey = '';
  search=false;
  text :string =''
  all: any[] = [];
  checked: number = 0;
  user!:any
  constructor(
    public canvas: CanvasService,
    private activeRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    public lang: LangService,
    private _auth:AuthService
  ) {
    this._auth.userInfo.subscribe((res)=>{
      if(res){
        this.user=res
      }
    })
  }

  ngOnInit() {
    this.getInitData();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    if(this.search==false){
    this.getCompanies();
  }
    else{
      this.searchObject();
    }
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    if(this.search==false){
      this.getCompanies();
    }
      else{
        this.searchObject();
      }
  }

  getInitData() {
    this.activeRoute.data.subscribe((res) => {
      console.log(res['companies'].totalCount);
      
      this.companies = res['companies'];
      this.total=res['companies'].totalCount
      console.log(this.companies.data);
      this.companies=this.companies.data.filter((ele:any)=>{return ele.isActive==true;})
      console.log(this.companies);
      
      this.getAllServices(this.companies);
    });
  }

  getCompanies() {
    this.search=false
    this.companiesService
      .getApprovedCompanies(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        if (!this.checked) {
          this.companies = res.data.filter((ele)=>{return ele.isActive==true;})
          console.log(this.companies);
          
          this.total = res.totalCount;
        } else {
          res.data.forEach((ele) => {
            if(ele.isActive == true){
            ele.securitCompanyAvailableServices.forEach((element) => {
              if (element.availableServices.id == this.checked) {
                this.all.push(ele);
              }
            });
          }
          });
          res.data = this.all;
          this.companies = res.data;
        }
      });
  }

  getAllServices(companies: SecurityCompany[]) {
    let services: any[] = [];
    companies.forEach((e) => {
      let arr = e.securitCompanyAvailableServices.map(
        (a) => a.availableServices
      );
      services = services.concat(arr);
      console.log(services);
      
    });

    this.services = [...new Map(services.map((m) => [m.id, m])).values()];
  }

  getValue(event: any) {
    this.all = [];
    this.checked = event.target.value;
    this.getCompanies();
  }
  clear() {
    $('.non-checked').prop('checked', false);
    this.checked = 0;
    this.getCompanies();
  }

  myFunction(x:any){
    this.search=true
    console.log(x.target.value);
    if(x.target.value == ""){
      this.getCompanies();
    }else{
   this.text=x.target.value;
   this.searchObject();
    }
  }

  searchObject(){
    this.companiesService.getAllApprovedSearch(this.pageNumber, this.pageSize , this.text).subscribe((res)=>{
      console.log(res);
     this.companies=res.data
     this.total = res.totalCount;
    })
  }
}
