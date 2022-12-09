import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: Object) {
    return  this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  setToken(response:any) {
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
      localStorage.setItem('fb-expDate', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    }else{
      localStorage.clear()
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-expDate') as string)
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  logout() {
    return this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }
}
