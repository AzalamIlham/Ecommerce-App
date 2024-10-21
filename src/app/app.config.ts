import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from './sevices/product.service';
import {  provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyCiAjtOD8_CA4yZRvb86oLcEW6VbJDQa40",
  authDomain: "ecommeceapp-c9634.firebaseapp.com",
  projectId: "ecommeceapp-c9634",
  storageBucket: "ecommeceapp-c9634.appspot.com",
  messagingSenderId: "462170384875",
  appId: "1:462170384875:web:30da8148a5d87a3e3ad1ae",
  measurementId: "G-N96JF6GYGH"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),ProductService,provideHttpClient()]
};


