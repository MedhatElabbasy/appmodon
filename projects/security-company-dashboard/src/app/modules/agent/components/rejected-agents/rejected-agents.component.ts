import { Component, OnInit } from '@angular/core';
import { Agent } from '../../model/agent';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-rejected-agents',
  templateUrl: './rejected-agents.component.html',
  styleUrls: ['./rejected-agents.component.scss'],
})
export class RejectedAgentsComponent implements OnInit {
  searchKey = '';
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
}
