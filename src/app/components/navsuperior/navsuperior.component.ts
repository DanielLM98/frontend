import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navsuperior',
  templateUrl: './navsuperior.component.html',
  styleUrls: ['./navsuperior.component.css']
})
export class NavsuperiorComponent {
  isAutenticated = false;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAutenticated = isLoggedIn;
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
