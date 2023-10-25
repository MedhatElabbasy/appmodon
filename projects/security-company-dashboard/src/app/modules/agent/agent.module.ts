import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './components/agent/agent.component';
import { CoreModule } from '../core/core.module';
import { AgentGridComponent } from './components/agent-grid/agent-grid.component';
import { AcceptedAgentsComponent } from './components/accepted-agents/accepted-agents.component';
import { RejectedAgentsComponent } from './components/rejected-agents/rejected-agents.component';
import { WaitingAgentsComponent } from './components/waiting-agents/waiting-agents.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { GuardsRoutingModule } from '../guards/guards-routing.module';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GuardsModule } from '../guards/guards.module';

@NgModule({
  declarations: [
    AgentComponent,
    AgentGridComponent,
    AcceptedAgentsComponent,
    RejectedAgentsComponent,
    WaitingAgentsComponent,
    AgentListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgentRoutingModule,
    GuardsRoutingModule,
    NgxHijriGregorianDatepickerModule,
    NgbModule,
    GuardsModule,
  ],
})
export class AgentModule {}
