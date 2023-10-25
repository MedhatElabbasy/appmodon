import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agent } from '../../model/agent';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-accepted-agents',
  templateUrl: './accepted-agents.component.html',
  styleUrls: ['./accepted-agents.component.scss'],
})
export class AcceptedAgentsComponent implements OnInit, OnDestroy {
  searchKey = '';
  accepted: boolean = true;
  constructor(private _AgentService: AgentService) {}
  allData: Agent[] = [];
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._AgentService.getAllAcceptedCompanyAgent().subscribe((res) => {
      this.allData = res;
    });
  }
  ngOnDestroy(): void {
    this.accepted = false;
  }
}
