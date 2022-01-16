import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (this.authService.isLogin()) {
      return true;
    } 
    this.router.navigate(['/login']);
    return false;
  }
}
