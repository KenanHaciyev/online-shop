import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  create(product: any) {
    return this.http.post(`${environment.fbUrl}/product.json`, product)
      .pipe(
        map((res: any) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date)
          }
        })
      )
  }

  getAll() {
    return this.http.get(`${environment.fbUrl}/product.json`)
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

  getById(id:string) {
    return this.http.get(`${environment.fbUrl}/product/${id}.json`)
      .pipe(
        map((res: any) => {
         return {
           ...res,
           id,
           date: new Date(res?.date)
         }
        })
      )
  }
}
