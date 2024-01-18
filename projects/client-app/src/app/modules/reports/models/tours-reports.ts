
import { FileObject } from "projects/tools/src/public-api"
import { SiteLocation } from "../../locations/models/sites"
//import { SiteLocation } from "../../client/models/site-details"

export interface TourReport {
    companySecurityGuard:string,
    companySecurityGuardId:string,
    guardTourCheckPoints:guardTourCheckPoints,
    id:string,
    startDate:string,
    tourId:string,
    tour:tour
}

export interface guardTourCheckPoints{
    description:string,
    endDate:string,
    guardTourId:string,
    id:string,
    startDate:string,
    tourCheckPoint:tourCheckPoint,
    tourCheckPointId:string,
    tourStatus:tourStatus,
    tourStatusId:string,
    guardTourCheckPointAttachments:guardTourCheckPointAttachments,
}

export interface guardTourCheckPointAttachments{
    guardTourCheckPointId:string,
    id:string,
    photoId:string,
    photo:FileObject
}

export interface tourCheckPoint
{
    description:string,
    id:string,
    name:string,
    tourId:string,
    photoId:string,
    photo:FileObject
}

export interface tourStatus{
    color:string,
    isDefault:string,
    id:string,
    nameAr:string,
    nameEn:string,
    optionSet:string,
    value:string
}

export interface tour{
    created:string,
    createdBy:string,
    fridayGuard:string,
    fridayGuardId:string,
    id:string,
    oneTimeSecurityGuardId:string,
    siteLocation:SiteLocation
    tourAddress:string,
    tourDescription:string,
    startDate:string
}