import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  send(order: any) {
    return this.http.post(`${environment.fbUrl}/orders.json`, order)
      .pipe(
        map((res: any) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date)
          }
        })
      )
  }

  getAll() {
    return this.http.get(`${environment.fbUrl}/orders.json`)
      .pipe(
        map((res: any) => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        })
      )
  }

  remove(id:string) {
    return this.http.delete(`${environment.fbUrl}/orders/${id}.json`)
  }

}
