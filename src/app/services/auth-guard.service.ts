import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  

  canActivate(route: ActivatedRouteSnapshot): boolean{
      const roles = route.data['roles'];
      var user;
      console.log(user);

      if(this.authService.isAutenticated()){
        user = JSON.parse(this.cookieService.get("user"));
      }

      if(this.authService.isAutenticated() && roles===undefined){
        console.log("si");
        return true;
      }else if(!this.authService.isAutenticated()){
        this.router.navigate(['login']);
        return false;
      }else if(!roles.includes(user.tipoUsuario)){
        this.router.navigate(['']);
        return false;
      }
      return true;
  }
}
