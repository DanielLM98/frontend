import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';
import { NavsuperiorComponent } from '../navsuperior/navsuperior.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formularios$!: Observable<Formulario[]>; 

  constructor(private formulariosService: FormulariosService, private cookieService: CookieService, private router: Router){ }

  ngOnInit(): void {

    let rol = JSON.parse(this.cookieService.get("user")).tipoUsuario;

    if(rol === "Administrador"){
      this.router.navigate(['admin/centros']);
    }
    else{
      this.formularios$ = this.formulariosService.getFormulariosbyRol(rol);
      console.log(this.formularios$)
      this.router.navigate([""]);

    }

  }


}
