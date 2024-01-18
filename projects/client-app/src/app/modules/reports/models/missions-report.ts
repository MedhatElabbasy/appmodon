import { FileObject } from "projects/tools/src/public-api"
import { securityGuard } from "../../dashboard/models/attencereport"
import { SiteLocation, SiteSupervisorShift } from "../../locations/models/sites"


export interface missionsReport{
        id: string,
        taskName: string,
        descrption: string,
        taskDtae: string,
        taskTime: string,
        tasKPriorityId: string,
        tasKPriority: tasKPriority
        taskSecurityGuardId: string,
        taskSecurityGuard:taskSecurityGuard,
        tasKStatus:tasKStatus,
        status: boolean,
        siteLocationId: string,
        siteLocation: SiteLocation
        guardTaskAttachments:guardTaskAttachments[],
        guardDescrption: string,
        siteSupervisorShiftId: string,
        siteSupervisorShift:SiteSupervisorShift,
        tasKStatusId: string,
        taskStartTime: string,
        taskEndTime: string
    
}

export interface guardTaskAttachments{
    id:string,
    photo:FileObject,
    photoId:number
    }

export interface tasKPriority{
    id: string,
    value: number,
    nameAr: string,
    nameEn:string,
    color:string,
    isDefault: boolean
}

export interface taskSecurityGuard{
    id: string,
    securityGuard:securityGuard,
    isActive: boolean,
    jobApplication: string,
    securityCompanyBranchId: string,
    securityCompanyBranch: string,
    securityCompanyId: number,
    securityCompany: string,
    isSuperVisor: boolean,
    isSecurityGurad: boolean,
    isCoveringGuard: boolean
}

export interface tasKStatus{
    id: string,
    value: number,
    nameAr: string,
    nameEn: string,
    color: string,
    isDefault: boolean
}

