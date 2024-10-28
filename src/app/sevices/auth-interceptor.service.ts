import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private authService :AuthService) { }

  intercept(req:HttpRequest<any>,next :HttpHandler):Observable <HttpEvent<any>>{
    const isAuthentificated = this .authService.isAuthenticated();

    if (isAuthentificated) {

      const authReq =req.clone (
        {
          headers :req.headers.set('Authorization','Bearer' + this.authService.getToken())
        }
      );
      return next.handle(authReq);
    }
    return next.handle(req);
    
  }
}
