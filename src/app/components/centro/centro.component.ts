import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Alumnos } from 'src/app/models/Alumnos';
import { Centro } from 'src/app/models/Centro';
import { Empresa } from 'src/app/models/Empresa';
import { Tutorestrabajo } from 'src/app/models/Tutorestrabajo';
import { User } from 'src/app/models/User';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {

  User: User = JSON.parse(this.cookieService.get('user') || '{}');
  Alumno!:Alumnos;
  TutorTrabajo!:Tutorestrabajo;
  centro!:Centro;
  constructor(private cookieService:CookieService, private empresaService:EmpresasService, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getCentro(this.User.ID).subscribe(
      data => {
        this.centro = data;
      });

  }
}
