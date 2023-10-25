import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedAgentsComponent } from './components/accepted-agents/accepted-agents.component';
import { AgentGridComponent } from './components/agent-grid/agent-grid.component';
import { AgentComponent } from './components/agent/agent.component';
import { RejectedAgentsComponent } from './components/rejected-agents/rejected-agents.component';
import { WaitingAgentsComponent } from './components/waiting-agents/waiting-agents.component';
import { agentRoutes } from './routes/agent-routes';

const routes: Routes = [
  {
    path: '',
    component: AgentComponent,
    children: [
      { path: '', redirectTo: agentRoutes.agentGrid, pathMatch: 'full' },
      {
        path: agentRoutes.agentGrid,
        component: AgentGridComponent,
        /* resolve: {
          initData: JobsResolver,
        },*/
      },
      {
        path: agentRoutes.acceptedAgents,
        component: AcceptedAgentsComponent,
        /* resolve: {
          initData: JobsResolver,
        },*/
      },
      /*  {
        path: agentRoutes.rejectedAgents,
        component: RejectedAgentsComponent,

      },*/
      {
        path: agentRoutes.waitingApproveAgents,
        component: WaitingAgentsComponent,
        /* resolve: {
          initData: JobsResolver,
        },*/
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class AgentRoutingModule {}
