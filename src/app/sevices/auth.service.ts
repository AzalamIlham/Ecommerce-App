import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isLoggedIn: boolean = false;  

  constructor() {}

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;

  }

  logout() {
    this.isLoggedIn = false;
  }
}
