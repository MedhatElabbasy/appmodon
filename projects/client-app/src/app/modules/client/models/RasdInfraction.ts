export interface RasdInfraction {
  id:number,
  rasdUserId: string;
  description: string;
  infractionNotes: string;
  infractionTitle: string;
  closeDescription: string;
  securityCompanyClientId: string;
  clientCompanyBranchId: string;
  clientCompanyId: number;
  securityCompanyBranchId: string;
  infractionAttachments: [
    {
      attachmentId: number;
      rasdInfractionId: string;
    }
  ];
  infractionStatusId: string;
}
