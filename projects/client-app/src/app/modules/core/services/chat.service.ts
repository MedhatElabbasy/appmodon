import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) { }

  chatCompany(clientID:number ,pageNumber:number ,pageSize:number ){
 return    this.http.get(this.url +`api/AgentClientChat/GetChatCompnay?id=${clientID}&page=${pageNumber}&pageSize=${pageSize}`)
}

clientCompany(clientID:number, AgentID:string ,pageNumber:number ,pageSize:number ){
  console.log("service");
  
  return this.http.get(this.url + `api/AgentClientChat/GetAllByClientCompany?id=${clientID}&agentId=${AgentID}&page=${pageNumber}&pageSize=${pageSize}`)
}

addAgentClientChat(model:any){
  return this.http.post(this.url + `api/AgentClientChat/Add`,model)
}

}
