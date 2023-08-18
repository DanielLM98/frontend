import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { Empresa } from 'src/app/models/Empresa';
import { Tutoresclase } from 'src/app/models/Tutoresclase';
import { Tutorestrabajo } from 'src/app/models/Tutorestrabajo';
import { User } from 'src/app/models/User';
import { CentrosService } from 'src/app/services/centros.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {

  userForm!: FormGroup

  userID!: number;
  user!: User;
  ExisteUser!: boolean;
  userRol!: String;
  userAdmin!: boolean;
  userAdminCentro!: boolean;
  centros$!: Observable<Centro[]>;
  empresas$!: Observable<Empresa[]>;
  empresaId!: number;
  tutoresEmpresa$!: Observable<User[]>;
  centroId!: number;
  tutoresClase$!: Observable<User[]>;

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private centrosService: CentrosService, private empresasService: EmpresasService) { }
  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.userID = +this.route.snapshot.paramMap.get('id')!;
      this.usuariosService.fetchById(this.userID).pipe().subscribe((user) => {
        console.log(user);
        this.user = user;
        if (user == null) {
          this.ExisteUser = false;
        } else {
          this.ExisteUser = true;
          this.userForm.patchValue(this.user);
        }
      });

    }
    if (this.cookieService.get("user") != "") {
      if (JSON.parse(this.cookieService.get("user")).TipoUsuario == "Administrador") {
        this.userAdmin = true;
      } else if (JSON.parse(this.cookieService.get("user")).TipoUsuario == "adminCentro") {
        this.userAdminCentro = true;
      }
    }
    this.centros$ = this.centrosService.fetchAll();
    this.empresas$ = this.empresasService.fetchAll();
    this.userForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      Nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      Apellidos: new FormControl("", [Validators.required, Validators.minLength(8)]),
      CorreoElectronico: new FormControl("", [Validators.required, Validators.email]),
      TipoUsuario: new FormControl("", [Validators.required]),
      Centro: new FormControl("", []),



    });
  }
  onUpdate(): void { }

  onSubmit(): void {
    this.usuariosService.create(this.userForm.value).pipe().subscribe((user) => {
      if (user.TipoUsuario == "Alumno") {
        this.usuariosService.createAlumno(user.ID,this.userForm.value['Centro'])

      }
    },
      (error: any) => {
        console.log(error);
      }
    );

    
  }
  onChange() {
    this.userRol = (document.getElementById("TipoUsuario") as HTMLSelectElement).value;
  }

  changeEmpresa(){
    if(parseInt((document.getElementById("Empresa") as HTMLSelectElement).value)>0){
      this.empresaId = parseInt((document.getElementById("Empresa") as HTMLSelectElement).value);
      this.tutoresEmpresa$ = this.empresasService.fetchTutoresEmpresa(this.empresaId);
    }
  }

  changeCentro(){
    if(parseInt((document.getElementById("Centro") as HTMLSelectElement).value)>0){
      this.centroId = parseInt((document.getElementById("Centro") as HTMLSelectElement).value);
      this.tutoresClase$ = this.centrosService.fetchTutoresEmpresa(this.empresaId);
    }
  }
}


