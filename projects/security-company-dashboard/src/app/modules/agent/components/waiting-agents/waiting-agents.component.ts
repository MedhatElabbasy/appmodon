import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agent } from '../../model/agent';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-waiting-agents',
  templateUrl: './waiting-agents.component.html',
  styleUrls: ['./waiting-agents.component.scss'],
})
export class WaitingAgentsComponent implements OnInit, OnDestroy {
  searchKey = '';
  waiting: boolean = true;
  constructor(private _AgentService: AgentService) {}
  allData: Agent[] = [];
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._AgentService.getWaitingAcceptedCompanyAgent().subscribe((res) => {
      this.allData = res;
    });
  }
  ngOnDestroy(): void {
    this.waiting = false;
  }
}
