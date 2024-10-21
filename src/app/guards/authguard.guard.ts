import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { inject } from '@angular/core';

  export const authguardGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService); 
    const router = inject(Router); 
  
    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/auth']);
      return false;
    }
  };

