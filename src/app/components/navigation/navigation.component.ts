import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isAutenticated = false;
  rol: string = "";
  isAdmin: boolean = false;
  isAdminCentro: boolean = false;
  isAlumno: boolean = false;
  isTutorCentro: boolean = false;
  isTutorEmpresa: boolean = false;

  constructor(private authService: AuthService, private router: Router, private cookieService:CookieService) {}


  ngOnInit(): void {
    this.rol = JSON.parse(this.cookieService.get('user')).TipoUsuario;
    if (this.rol == "Administrador") {
      this.isAdmin = true;
    } else if (this.rol == "AdminCentro") {
      this.isAdminCentro = true;
    } else if (this.rol == "Alumno") {
      this.isAlumno = true;
    } else if (this.rol == "TutorCentro") {
      this.isTutorCentro = true;
    } else if (this.rol == "TutorEmpresa") {
      this.isTutorEmpresa = true;
    }
    this.isAutenticated=this.authService.isAutenticated();
  }
  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
