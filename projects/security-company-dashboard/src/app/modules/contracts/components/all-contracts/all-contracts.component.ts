import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangService, Pagination, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { SIDEBAR_LIST } from '../../../core/data/sidebar-menu';
import { Contract } from '../../models/contracts';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.scss'],
})
export class AllContractsComponent implements OnInit {
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
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

  getInitData() {
    this.route.data.subscribe((res) => {
      this.contracts = res['contracts'];
    });
  }

  getContracts() {}
}
