import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string = 'guest';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      if (user && user.hasOwnProperty('firstname')) {
        this.name = user.firstname + ' ' + user.lastname;
      } else {
        this.name = 'guest';
      }
    });
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.userLogout().subscribe(
      res => {
        this.authService.setUser(null);
        this.router.navigate(['/auth/landing/login']);
      },
      err => {
        console.log(err);
      },
    );
  }

}
