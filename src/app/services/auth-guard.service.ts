import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  // canActivate(): Observable<boolean>{
  //   if(!this.authService.isUserLoggedIn$.value){
  //     this.router.navigate(["login"]);
  //   }
  //   return this.authService.isUserLoggedIn$;

  // }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roles = route.data['roles'];
    var user;
    var logeado = this.authService.isAutenticated();
    this.authService.isUserLoggedIn$.next(logeado);
    if (this.authService.isUserLoggedIn$.value) {
      user = JSON.parse(this.cookieService.get("user"));
    } else {
      this.router.navigate(['login']);
    }

    if(this.authService.isUserLoggedIn$.value && roles===undefined){
      return this.authService.isUserLoggedIn$;
    }else if(!roles.includes(user.TipoUsuario)){
      this.router.navigate(['']);
    }
    console.log(user);

    return this.authService.isUserLoggedIn$;

    // if(this.authService.isAutenticated() && roles===undefined){
    //   console.log("si");
    //   this.authService.isUserLoggedIn$.next(true);
    //   return true;
    // }else if(!this.authService.isAutenticated()){
    //   this.router.navigate(['login']);
    // }else if(!roles.includes(user.tipoUsuario)){
    //   this.router.navigate(['']);
    // }
    // this.authService.isUserLoggedIn$.next(true);
    // return true;
  }
}
