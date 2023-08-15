import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isAutenticated = false;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.isAutenticated=this.authService.isAutenticated();
  }
  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
