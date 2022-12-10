import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router,
              private authServ:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authServ.isAuthenticated()){
      request = request.clone({
        setParams:{
          auth: this.authServ.token as string
        }
      })
    }
    return next.handle(request)
    .pipe( catchError(error => {
      if (error===401) {
        this.authServ.logout()
        this.router.navigate(['/admin', 'login'])
      }
      return throwError(error)
    }))
  }
}
