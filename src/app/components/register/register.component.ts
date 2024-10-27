import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../sevices/auth.service';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterModule,AngularFireAuthModule,AngularFireModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {


  registerForm: FormGroup;
  email: string = '';
  password: string = '';
  token!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue] 
    }, { 
      validator: this.passwordMatchValidator 
    });
  }
  
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  onRegister() {
    // if (this.registerForm.valid) {
    //   this.authService.login();
    //   this.router.navigate(['/mes-commandes']);  
    // } else {
    //   console.log('Form is invalid');
    // }
    if (this.registerForm.invalid) {
      console.log("Le formulaire est invalide");
      return;
    }
    const email = this.registerForm.value.email.trim();
    const password = this.registerForm.value.password;
    console.log("Tentative de connexion avec l'email :", email);
    this.authService.register(email, password).then(
      (value: any) => {
        this.router.navigate(["mes-commandes"]);
        localStorage.setItem("accessToken", value.user.multiFactor.user.accessToken);
        localStorage.setItem("auth", "true");
        this.authService.isAuthBehav.next(true);
      },
      (error: any) => {
        console.log("Erreur détectée :", error.message);
        localStorage.setItem("auth", "false");
        this.authService.isAuthBehav.next(false);
      }
    );
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
