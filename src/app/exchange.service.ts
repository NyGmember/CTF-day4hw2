import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private access_key = '15a724ea9324d931fbb615511ae2bb3c';
  private apiURL = 'http://api.exchangeratesapi.io/v1/';

  constructor(private httpClient: HttpClient) { }

  getSymbol(): Observable<any>{
    let url = this.apiURL + 'symbols?access_key=' + this.access_key;
    return this.httpClient.get<any>(url);
  }

  getRate(): Observable<any>{
    let url = this.apiURL + 'latest?access_key=' + this.access_key;
    return this.httpClient.get<any>(url);
  }
}
