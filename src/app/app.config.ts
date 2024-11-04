import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthInterceptorService } from './sevices/auth-interceptor.service';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

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

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
  provideHttpClient(),
  importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
  importProvidersFrom(AngularFireAuth),
  importProvidersFrom(AngularFireAuthModule),
  importProvidersFrom(Firestore),
  provideFirestore(() => getFirestore()),
  provideFirebaseApp(()=> initializeApp(firebaseConfig)),

  provideFirestore(() => getFirestore()),



  {provide :HTTP_INTERCEPTORS,
  useClass : AuthInterceptorService ,
  multi :true}
]

}