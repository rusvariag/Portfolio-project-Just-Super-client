import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const user: User = this.authService.getUserGuard();
    if (user?.role === 'customer') {
      return true;
    } else {
      if (user?.role === 'admin') {
        this.router.navigate(['/shop/admin']);
        return false;
      } else {
        this.router.navigate(['/auth/landing/login']);
        return false;
      }
    }
  }
}
