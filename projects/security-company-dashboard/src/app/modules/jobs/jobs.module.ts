import {      NgModule    } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobsGridComponent } from './components/jobs-grid/jobs-grid.component';
import { JobsRoutingModule } from './job-roouting.module';
import { JobComponent } from './components/job/job.component';
import { WaitingJobsComponent } from './components/waiting-jobs/waiting-jobs.component';

@NgModule({
  declarations: [
    JobsGridComponent,
    JobDetailsComponent,
    JobComponent,
    WaitingJobsComponent,
  ],
  imports: [CoreModule, JobsRoutingModule],
      
})
export class JobsModule {}
