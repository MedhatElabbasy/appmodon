import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangService, Pagination, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { Contract } from '../../models/contracts';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-active-contracts',
  templateUrl: './active-contracts.component.html',
  styleUrls: ['./active-contracts.component.scss'],
})
export class ActiveContractsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  sizes = [...PAGINATION_SIZES];
  contracts!: Pagination<Contract>;
  searchKey = '';

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private contractService: ContractsService
  ) {}

  ngOnInit() {
    this.getInitData();
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.getContracts();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getContracts();
  }

  getInitData() {
    this.route.data.subscribe((res) => {
      this.contracts = res['contracts'];
    });
  }

  getContracts() {
    this.contractService
      .getActiveContracts(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.contracts = res;
      });
  }
}
