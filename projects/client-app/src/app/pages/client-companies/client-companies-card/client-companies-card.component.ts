import { Component, Input, OnInit } from '@angular/core';
import { Pagination, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { ClientCompany } from '../../../modules/auth/models/client-company.model';
import { ClientCompaniesService } from '../../services/client-companies.service';

@Component({
  selector: 'app-client-companies-card',
  templateUrl: './client-companies-card.component.html',
  styleUrls: ['./client-companies-card.component.scss']
})
export class ClientCompaniesCardComponent implements OnInit {
  //@Input('data') data!: ClientCompany
  clients!: ClientCompany[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  searchKey=''
  totalCount=0
  constructor(private _ClientCompaniesService:ClientCompaniesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAll();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAll();
  }

  getAll() {
    this._ClientCompaniesService
      .getALL(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.clients = res.data;
        this.totalCount= res.totalCount
        console.log(this.clients);
        
      });
}
}
