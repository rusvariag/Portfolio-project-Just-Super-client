import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { loginUrl, registerUrl, logoutUrl } from 'src/app/config/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  setUser(user) {
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }

  getUserGuard() {
    const user: any = this.user.value;
    return user;
  }

  isLoggedIn() {
    if (this.user.value) {
      if(this.user.value.hasOwnProperty('role')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  userLogin(user) {
    return this.http.post<User>(loginUrl, user);
  }

  userRegister(user) {
    return this.http.post<User>(registerUrl, user);
  }

  userLogout() {
    return this.http.get<any>(logoutUrl);
  }

  getToken() {
    const token = this.cookieService.get('jwt');
    return token;
  }

}
