import { Component, OnInit } from '@angular/core';
import { ClientCompany, Pagination, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { ClientCompaniesService } from './../services/client-companies.service';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-client-companies',
  templateUrl: './client-companies.component.html',
  styleUrls: ['./client-companies.component.scss'],
})
export class ClientCompaniesComponent implements OnInit {
  clients!: ClientCompany[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  user!:any
  searchKey = '';
  constructor(private _ClientCompaniesService: ClientCompaniesService , private _auth:AuthService) {

    this._auth.userInfo.subscribe((res)=>{
      if(res){
        this.user=res
      }
    })
  }
  ngOnInit(): void {
    
  }
  
}
