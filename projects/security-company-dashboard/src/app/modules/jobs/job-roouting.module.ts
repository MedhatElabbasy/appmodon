import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobDetailsResolver } from './components/job-details/job-details.resolver';
import { JobComponent } from './components/job/job.component';
import { JobsGridComponent } from './components/jobs-grid/jobs-grid.component';
import { JobsResolver } from './components/jobs-grid/jobs.resolver';
import { WaitingJobsComponent } from './components/waiting-jobs/waiting-jobs.component';
import { WaitingJobsResolver } from './components/waiting-jobs/waiting-jobs.resolver';
import { JobsRoutes } from './routes/jobs-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      { path: '', redirectTo: JobsRoutes.jobsGrid, pathMatch: 'full' },
      {
        path: JobsRoutes.jobsGrid,
        component: JobsGridComponent,
        resolve: {
          initData: JobsResolver,
        },
      },
      {
        path: JobsRoutes.waitingApprove,
        component: WaitingJobsComponent,
        resolve: {
          jobs: WaitingJobsResolver,
        },
      },
    ],
  },
  {
    path: JobsRoutes.jobDetails + '/:id',
    component: JobDetailsComponent,
    resolve: {
      details: JobDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
