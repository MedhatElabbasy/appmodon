import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agent } from '../../model/agent';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-grid',
  templateUrl: './agent-grid.component.html',
  styleUrls: ['./agent-grid.component.scss'],
})
export class AgentGridComponent implements OnInit,OnDestroy {
  searchKey = '';
  all:boolean=true
  constructor(private _AgentService: AgentService) {}
  allData: Agent[] = [];
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._AgentService.getAllCompanyAgent().subscribe((res) => {
      this.allData = res;

    });
  }
ngOnDestroy(): void {
  this.all=false
}
}
