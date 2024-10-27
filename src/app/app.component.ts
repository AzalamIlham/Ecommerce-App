import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,ReactiveFormsModule,AngularFireModule,AngularFireAuthModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})

export class AppComponent {

  

 
}
