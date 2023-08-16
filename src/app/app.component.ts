import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  isAutenticated!: boolean;
  constructor(private authService: AuthService,
    private router: Router, private cookieService: CookieService) {
      this.isAutenticated = this.authService.isAutenticated();
  }
  ngOnInit(): void {
    this.router.navigate(['']);

  }
}

