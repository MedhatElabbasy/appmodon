import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'projects/client-app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferDetailsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) { }
  getOffer(id: string) {
    return this.http.get(
      this.url + `api/ClientPriceOffers/GetAllByOrderId?Id=${id}`
    );
  }
  approveOffer(id: string) {
    return this.http.post(
      this.url + `api/ClientPriceOffers/Approve?Id=${id}`
      , {});
  }
  rejectOffer(id: string, reson: string) {
    return this.http.post(
      this.url + `api/ClientPriceOffers/Reject?Id=${id}&&reson=${reson}`
      , {});
  }
  updateStatus(offerId: string, value: number) {
    return this.http.post(
      this.url + `api/ClientPriceOffers/UpdateOfferStatus?orderId=${offerId}&&optionSetName=offerStatus&&value=${value}`
      , {});
  }
  getMessages(id: string) {
    return this.http.post(
      this.url + `api/ClientPriceOffers/GetAllOfferMessage?Id=${id}`
      , {});
  }
  sendMessage(data: any) {
    return this.http.post(
      this.url + `api/ClientPriceOffers/AddOfferMessage`
      , data);
  }
}
