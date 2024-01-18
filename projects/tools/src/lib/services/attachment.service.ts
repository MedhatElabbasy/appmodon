import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private url;
  constructor(private http: HttpClient, @Inject('env') private env: any) {
    this.url = env.api;
  }

  uploadFile(name: string, file: File) {
    console.log(file);
    
    let imgSize = 2000000
    let fileSize = file.size
    if(fileSize <= imgSize){
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
   
    return this.http.post(this.url + `api/Attachment/uploadFormFile`, formData);
  }else{
    return this.http.post(this.url + `api/Attachment/uploadFormFile`, {});
  }
  }

  getQRCode() {
    return this.http.get(this.url + `api/qrCode`, { responseType: 'text' });
  }
}
