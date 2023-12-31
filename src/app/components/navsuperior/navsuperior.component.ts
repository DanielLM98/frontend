import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navsuperior',
  templateUrl: './navsuperior.component.html',
  styleUrls: ['./navsuperior.component.css']
})
export class NavsuperiorComponent {
  isAutenticated = false;
  user!: User | null;;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    
  }


  ngOnInit(): void {
   this.isAutenticated=this.authService.isAutenticated();

    this.user = JSON.parse(this.cookieService.get("user"));

  }
  logout(): void {
    localStorage.removeItem('token');
    this.cookieService.deleteAll();
    this.authService.isUserLoggedIn$.next(false);
    window.location.reload();
  }
}
