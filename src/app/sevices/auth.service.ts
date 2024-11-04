import {Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken() {
    throw new Error('Method not implemented.');
  }
  UserId:any=localStorage.getItem("userid");
  
  isLoggedIn : boolean= localStorage.getItem("auth")=="true";
  isAuthBehav = new BehaviorSubject<boolean>(this.isLoggedIn);
  isAuthObserv = this.isAuthBehav.asObservable();
  constructor(private router: Router, private fireBase:AngularFireAuth) { }
  login(email: string, password: string) {
    return this.fireBase.signInWithEmailAndPassword(email, password); 
  }

  register(email: string, password: string) {
    return this.fireBase.createUserWithEmailAndPassword(email, password); 
  }
  
  // logout() {
  //   this.isAuthBehav.next(false);
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean | Promise<any> {
    if (!this.isAuthBehav.getValue()) {
      this.router.navigate(["auth"]);
      return false;
    }
    return true;
  }

  // register(email: string, password: string) {
  //   return this.fireBase.signInWithEmailAndPassword(email, password);
  // }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // login(email: string, password: string) {
  //   return this.fireBase.signInWithEmailAndPassword(email, password);

  // }

   logout() {
    this.isLoggedIn = false;
   }
   
}
