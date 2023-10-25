import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'projects/tools/src/public-api-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading!: Observable<boolean>;
  constructor(private loaderService: LoaderService) {
    this.loading = this.loaderService.isLoading;
  }

  ngOnInit(): void {}
}
