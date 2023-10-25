import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-orders',
  templateUrl: './branch-orders.component.html',
  styleUrls: ['./branch-orders.component.scss'],
})
export class BranchOrdersComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
 
  }
}
