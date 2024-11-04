import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../sevices/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginForm: FormGroup;

  email: string = '';
  password: string = '';
  token!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {

    // if (this.loginForm.valid) {
    //   this.authService.login();
    //   this.router.navigate(['/mes-commandes']);  
    // } else {
    //   console.log('Form is invalid');
    // }
    if (this.loginForm.invalid) {
      console.log("Le formulaire est invalide");
      return;
    }
    const email = this.loginForm.value.email.trim();
    const password = this.loginForm.value.password;
    console.log("Tentative de connexion avec l'email :", email);
    this.authService.login(email, password).then(
      (value: any) => {
        this.router.navigate(["mes-commandes"]);
        localStorage.setItem("accessToken", value.user.multiFactor.user.accessToken);
        localStorage.setItem("auth", "true");
        this.authService.isAuthBehav.next(true);
        console.log(`userid : ${value.user.uid}`);
        localStorage.setItem("userid",value.user.uid);
        this.authService.UserId=value.user.uid;

      },
      (error: any) => {
        console.log("Erreur détectée :", error.message);
        localStorage.setItem("auth", "false");
        this.authService.isAuthBehav.next(false);
      }
    );
  }

  
  get formControls() {
    return this.loginForm.controls;
  }
}
