import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token")!) as any;
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
      }
      else {
        this.authService.isUserLoggedIn$.next(true);
      }

    }
  }
}
