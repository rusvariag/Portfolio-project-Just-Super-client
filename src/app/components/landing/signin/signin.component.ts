import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  logged = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  isLogged() {
    this.authService.getUser().subscribe((user: User) => {
      if (user) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }
}
