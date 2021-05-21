import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const user: User = this.authService.getUserGuard();
    if (user?.role === 'admin') {
      return true;
    } else {
      if (user?.role === 'customer') {
        this.router.navigate(['/shop/shopping']);
        return false;
      } else {
        this.router.navigate(['/auth/landing/login']);
        return false;
      }
    }
  }

}
