import { Component, Input, OnInit } from '@angular/core';
import { AttendanceReport } from '../../models/attencereport';
import { ModalService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-dash-guard-card',
  templateUrl: './dash-guard-card.component.html',
  styleUrls: ['./dash-guard-card.component.scss']
})
export class DashGuardCardComponent implements OnInit {
  @Input('data') data!: AttendanceReport;
  @Input('startTime') startTime!: string;
  @Input('endTime') endTime!: string;
  @Input('breakTime') breakTime!: string;
  @Input('totalWorkTime') totalWorkTime!: string;
  start!:any
  end!:any
  break!:any
  totalwork!:any
 
  constructor(private _model:ModalService) { }

  ngOnInit(): void {
    // console.log(this.data);
    // console.log(this.time)
   // if(this.data.breakLogger!=null){
    this.start=this.startTime?.split(' ')[1]
    this.end=this.endTime?.split(' ')[1]
    this.totalwork = this.totalWorkTime?.split('.')[0]
   // console.log(this.startTime);
  //  console.log(this.endTime);
   // console.log(this.breakTime);
    
    if(this.data.breakLogger!=null){
     // console.log(this.data.isOnBreak);
      
     // console.log(this.data.breakLogger);
      this.break=this.data.breakLogger?.startTime;
     // console.log(this.break);
    }
  }




}
