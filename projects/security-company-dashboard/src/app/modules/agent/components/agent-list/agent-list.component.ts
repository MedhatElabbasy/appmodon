import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../../model/agent';
import { AgentService } from './../../services/agent.service';
import { OptionSetService } from './../../../../../../../tools/src/lib/services/option-set.service';

import { CanvasService, LangService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss'],
})
export class AgentListComponent implements OnInit {
  @Input() agents!: any;
  @Input() searchKey!: string;
  @Input() waiting!: boolean;
  @Input() accepted!: boolean;
  @Input() all!: boolean;
  canvasId: string = 'canv';
  agentDetails!: Agent;
  constructor(
    private _AgentService: AgentService,
    private _OptionSetService: OptionSetService,
    private _CanvasService: CanvasService,
    public lang: LangService
  ) {}
  ngOnInit(): void {
    // this.status()
  }
  toggleState(agent: Agent, event: any) {
    event.stopImmediatePropagation()
    if (event.checked) {
      this._AgentService.active(agent.id);
    } else {
      this._AgentService.deActive(agent.id);
    }
  }
  /*status(){
    this._OptionSetService.getOptionSetByName('Agentstatus').subscribe((res)=>{
      console.log(res);
    })
  }*/

  acceptedAgent(id: string, i: number) {
    this._AgentService.approve(id).subscribe((res) => {
      if (res) {
        this.agents.splice(i, 1);
      }
    });
  }
  rejectAgent(id: string, i: number) {
    this._AgentService.reject(id).subscribe((res) => {
      if (res) {
        this.agents.splice(i, 1);
      }
    });
  }
  details(agent: Agent, event: any) {
    event.stopImmediatePropagation();
    this.agentDetails = agent;
    this._CanvasService.open(this.canvasId);
  }
}
