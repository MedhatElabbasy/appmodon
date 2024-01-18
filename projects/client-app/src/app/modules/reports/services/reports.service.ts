import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { BehaviorSubject, map, Observable, observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
//import { Loader } from '../../core/enums/loader.enum';
import { AttendanceReport } from '../models/attendance-report';
import { Incident } from '../models/incident';
import { VisitorsReport } from '../models/visitors-report';
import { environment } from 'projects/client-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly url = environment.api;
  stepNumber = new BehaviorSubject<number>(0);
  clientId = new BehaviorSubject<number>(0)
  statisticData = new BehaviorSubject<any>(null)
  private formDataSubject = new BehaviorSubject<any[]>([]);
  formData$ = this.formDataSubject.asObservable();


  constructor(private http: HttpClient, private auth: AuthService) {
    this.stepNumber.next(0);
    console.log(this.stepNumber);
   }

   setFormData(data: any) {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next([...currentData, data]);
  }

  attendanceReportForClient(clientId: number, date: string) {
    //let clientId = this.auth.snapshot.userInfo?.id;
    return this.http.get<VisitorsReport[]>(
      this.url + `api/Visitor/GetAllByClientId?Id=${clientId}&date=${date}`
    );
  }

  GetAllByClientAndBranchId(date: string, BranchId: string) {
    let clientId = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId;
    return this.http.get<VisitorsReport[]>(
      this.url + `api/Visitor/GetAllByClientAndBranchId?Id=${clientId}&date=${date}&$BranchId=${BranchId}`
    );
  }

  attendanceReportForBranch(date: string) {
    let branchId = this.auth.snapshot.userInfo?.clientCompanyBranchId;
    console.log(this.auth.snapshot.userInfo);

    return this.http.get<VisitorsReport[]>(
      this.url + `api/Visitor/GetAllByBranshId?Id=${branchId}&date=${date}`
    );
  }

  getAllAccidentByClientCompany(clientId: number, startDate: string, endDate: string) {


    // console.log(clientId);
    // if (clientId) {
    return this.http
      .get<Incident[]>(
        this.url +
        `api/Incident/GetAllByClientCompanyAndDate?ClientCompanyId=${clientId}&SatrtDate=${startDate}&EndDate=${endDate}`
      )
      .pipe(
        map((res) => {
          res = res.map((e) => {
            e.gallery = e.incidentAttachments.map((a) => a.attachment.fullLink);
            return e;
          });

          return res;
        })
      );
    //}

  }

  GetAllByClientCompanyAndDateAndSecurityCompany(clientId: number, startDate: string, endDate: string, CompanyId: number) {
    return this.http
      .get<Incident[]>(
        this.url +
        `api/Incident/GetAllByClientCompanyAndDateAndSecurityCompany?ClientCompanyId=${clientId}&SatrtDate=${startDate}&EndDate=${endDate}&SecurityCompanyId=${CompanyId}`
      )
      .pipe(
        map((res) => {
          res = res.map((e) => {
            e.gallery = e.incidentAttachments.map((a) => a.attachment.fullLink);
            return e;
          });

          return res;
        })
      );
  }

  GetAllByClientCompanyAndDateAndBranchId(startDate: string, endDate: string, BranchId: string) {
    let clientId = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId;
    return this.http
      .get<Incident[]>(
        this.url +
        `api/Incident/GetAllByClientCompanyAndDateAndBranchId?ClientCompanyId=${clientId}&SatrtDate=${startDate}&EndDate=${endDate}&BranchId=${BranchId}`
      )
      .pipe(
        map((res) => {
          res = res.map((e) => {
            e.gallery = e.incidentAttachments.map((a) => a.attachment.fullLink);
            return e;
          });

          return res;
        })
      );
  }

  getAttendanceReport(startDate: string, clientId: number, endDate: string) {
    //let clientId = this.auth.snapshot.userInfo?.id;
    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByClientIdAndDate?EndDate=${endDate}&clientId=${clientId}&StartDate=${startDate}`,
    );
  }

  // GetAllByClientIdAndDateAndBranchId(clientId: number, startDate: string, endDate: string, BranchId: string) {
  GetAllByClientIdAndDateAndBranchId(clientId: number, startDate: string, endDate: string, ClientBranchId: string) {
    // let clientId = this.auth.snapshot.userInfo?.clientCompanyId;
    // console.log(clientId);

    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByClientIdAndDateAndBranchId?EndDate=${endDate}&clientId=${clientId}&StartDate=${startDate}&ClientBranchId=${ClientBranchId}`,
    );
  }

  getSecurityCompanyBranchIdByClientCompanyBranchId(clientCompanyBranchId: string): Observable<any> {
    return this.http.get(this.url + `api/ClientCompanyBranch/GetById?id=${clientCompanyBranchId}`)
  }

  getAttendanceReportByClientandBySecurityCompany(
    clientId: number,
    startDate: string,
    endDate: string,
    CompanyId: number
  ) {
    // let clientId = this.auth.snapshot.userInfo?.id;
    // console.error("getAttendanceReportByClientandBySecurityCompany");

    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByCompanyAndClientIdAndDate?CompanyId=${CompanyId}&StartDate=${startDate}&EndDate=${endDate}&clientId=${clientId}`
    );
  }

  getAttendanceReportByClientandBySecurityCompanyAndBranchId(
    startDate: string,
    endDate: string,
    SecurityCompanyClientId: string,
    clientId: number,
    ClientBranchId: string) {
    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByCompanyAndClientIdAndDateAndBranch?SecurityCompanyClientId=${SecurityCompanyClientId}&StartDate=${startDate}&EndDate=${endDate}&clientId=${clientId}&ClientBranchId=${ClientBranchId}`
      //`api/Attendance/GetAllByCompanyAndClientIdAndDate?CompanyId=${CompanyId}&StartDate=${startDate}&EndDate=${endDate}&clientId=${clientId}`
    );
  }


  getAttendanceStatisitcReportByClient(
    startDate: string,
    endDate: string,
    ClientId: number,

  ) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAttendanceStatsticByClientandLocation?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}&ClientId=${ClientId}`,

    );
  }
  getAttendanceStatisitcReport(
    startDate: string,
    endDate: string,

  ) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get(
      this.url +
      `api/Attendance/GetAttendanceStatsticByCompanyId?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}`,

    );
  }


  getData(ClientId: number, firstDate: string, lastDate: string) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get(
      this.url + `api/Attendance/GetAttendanceStatsticByClientandLocationAndDay?CompanyId=${companyId}&StartDate=${firstDate}&EndDate=${lastDate}&clientId=${ClientId}`
    );
  }
  getALlData(firstDate: string, lastDate: string) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get(
      this.url + `api/Attendance/GetAttendanceStatsticLocationAndDay?CompanyId=${companyId}&StartDate=${firstDate}&EndDate=${lastDate}`
    );
  }

  getAllSecurityCompanyClients(clientId: number, page: number, pageSize: number) {
    return this.http.get(
      this.url + `api/SecurityCompanyClients/GetAllByClientId?ClientId=${clientId}&page=${page}&pageSize=${pageSize}`
    );
  }

  getAttendanceSuperVisorReport(clientId: number,
    startDate: string,
    endDate: string
  ) {
    // let companyId = this.auth.snapshot.userInfo?.id;
    console.log(clientId);

    return this.http.get<any[]>(
      this.url +
      `api/SupervisorAttendance/GetAllBetweenTwoDates?id=${clientId}&StartDate=${startDate}&EndDate=${endDate}`,

    );
  }

  GetAllBetweenTwoDatesAndBranch(clientId: number, startDate: string,
    endDate: string,
    BranchId: string) {
    //  let clientId = this.auth.snapshot.userInfo?.clientCompanyId;

    console.log(clientId);
    return this.http.get<any[]>(
      this.url +
      `api/SupervisorAttendance/GetAllBetweenTwoDatesAndBranch?id=${clientId}&StartDate=${startDate}&EndDate=${endDate}&BranchId=${BranchId}`,

    );

  }

  GetAllByCompanyAndBranchId(id: number,

    BranchId: string) {
    // let clientId = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId;
    //   console.log(clientId);
    return this.http.get<any[]>(
      this.url +
      `api/SupervisorAttendance/GetAllByCompanyAndBranchId?id=${id}&BranchId=${BranchId}`,

    );
  }

  GetSecurityAuditForm()
{
  return this.http.get(this.url + `api/SecurityAuditForm/GetSecurityAuditForm`);
}

setSecurityAuditForm(model:object){
  return this.http.post(this.url+`api/SecurityAuditForm/Add`,model)
}

GetSecurityAuditFormByClientCompanyID(ClientCompanyId:number){
  return this.http.get(this.url + `api/SecurityAuditForm/GetAllByClientCompanyId?ClientCompanyId=${ClientCompanyId}`);
}

getAllReceivingDeliveringVehicles(securityCompanyId:number){
  return this.http.get(environment.api +`api/ReceivingDeliveringVehicles/GetAllBySecurtityCompanyId?SecurtityCompanyId=${securityCompanyId}`)
}

getAllMissionsByClientCompanyId(clientId:number){
return this.http.get<any[]>(
  this.url + `api/GuardTask/GetAllClientCompanyId?ClientCompanyId=${clientId}`)
}

getAllToursByClientCompanyId(clientId:number){

return this.http.get<any[]>(
  this.url + `api/GuardTour/GetByClientCompanyId?ClientCompanyId=${clientId}`)
}
}
