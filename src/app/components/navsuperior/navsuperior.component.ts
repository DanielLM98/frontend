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
<<<<<<< HEAD
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAutenticated = isLoggedIn;
    });
    this.user = JSON.parse(this.cookieService.get("user"));
=======
    if(this.cookieService.get("token")!="" && this.cookieService.get("user")!=""){
      console.log("hola")
      this.isAutenticated = true;
      this.user = JSON.parse(this.cookieService.get("user")) ;
    }
>>>>>>> main


  }
  logout(): void {
<<<<<<< HEAD
    localStorage.removeItem('token');
    this.cookieService.delete("token");
    this.cookieService.delete("user");
=======
    this.cookieService.deleteAll();
>>>>>>> main
    this.authService.isUserLoggedIn$.next(false);
    this.isAutenticated = false;
    this.router.navigate(['login']);
  }
}
