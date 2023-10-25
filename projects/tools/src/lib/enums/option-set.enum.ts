export enum OptionSetEnum {
  ContractType = 'ContractType',
  PageType = 'PageType',
  IncidentType = 'IncidentType',
  OrderStatus = 'OrderStatus',
  LeaveType = 'LeaveType',
  LeaveDuration = 'LeaveDuration',
  VisitorType = 'VisitorType',
  ContractStatus = 'ContractStatus',
  breakType = 'BreakType',
  ApprovedStatus	= "ApprovedStatus"
}

export enum OrderStatus {
  new = 1,
  approvedByMain = 2,
  approved = 3,
  contractCreated = 4,
  rejected = 7,
}

export enum ContractStatus {
  new = 1,
  accepted = 2,
  active = 3,
  suspended = 4,
  rejected = 5,
  acceptedByTakid = 6,
  rejectedByTakid = 7,
}

export enum BreakType {
  paid = 1,
  unpaid = 2,
}


export enum ApprovedStatus	{
  pending = 1,
  approved = 2,
  rejected = 3,
}