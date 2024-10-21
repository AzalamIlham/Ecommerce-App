import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../sevices/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'] 
})
export class AuthComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login();
      this.router.navigate(['/mes-commandes']);  
    } else {
      console.log('Form is invalid');
    }
  }


  get formControls() {
    return this.loginForm.controls;
  }
}
