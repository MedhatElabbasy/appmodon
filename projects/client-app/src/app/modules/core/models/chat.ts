export interface chat{
    agent:agent,
    agentchat:agentchat[]
}

export interface agent{
    id: string,
    isActive: boolean,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    photo:photo
}

export interface photo{
    id: number,
    imageId: string,
    name: string,
    fullLink: string
}

export interface agentchat{

}

export interface clientCompanyChat{
    agent:agent;
    agentId:string;
    message:string;
    isFromAgent:boolean;
}