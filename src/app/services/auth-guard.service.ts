import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(): Observable<boolean>{
    if(!this.authService.isUserLoggedIn.value){
      this.router.navigate(["login"]);
    }
    return this.authService.isUserLoggedIn;

  }
}
