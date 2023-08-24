import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AdminCentro } from 'src/app/models/AdminCentro';
import { Centro } from 'src/app/models/Centro';
import { Empresa } from 'src/app/models/Empresa';
import { Tutoresclase } from 'src/app/models/Tutoresclase';
import { Tutorestrabajo } from 'src/app/models/Tutorestrabajo';
import { User } from 'src/app/models/User';
import { AdmincentroService } from 'src/app/services/admincentro.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CentrosService } from 'src/app/services/centros.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { TutoresclaseService } from 'src/app/services/tutoresclase.service';
import { TutorestrabajoService } from 'src/app/services/tutorestrabajo.service';
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
  tutorC!: Tutoresclase;
  tutorT!: Tutorestrabajo;
  adminCentro!: AdminCentro;
  

  constructor(private tutoreService: TutorestrabajoService,private tutorCService: TutoresclaseService,private alumnosService: AlumnosService ,private adminCentroService: AdmincentroService, private usuariosService: UsuariosService, private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private centrosService: CentrosService, private empresasService: EmpresasService) { }
  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.userID = +this.route.snapshot.paramMap.get('id')!;
      this.usuariosService.fetchById(this.userID).pipe().subscribe((user) => {
        this.user = user;
        if (user == null) {
          this.ExisteUser = false;
        } else {
          this.ExisteUser = true;
          this.userForm.patchValue(this.user);
          (document.getElementById("TipoUsuario") as HTMLSelectElement).value = this.user.TipoUsuario;
          this.onChange();
          alert("Debe rellenar los campos que no están completos")
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
      Apellido: new FormControl("", [Validators.required, Validators.minLength(4)]),
      CorreoElectronico: new FormControl("", [Validators.required, Validators.email]),
      TipoUsuario: new FormControl("", [Validators.required]),
      Centro: new FormControl("", []),
      Empresa: new FormControl("", []),
      TutorEmpresa: new FormControl("", []),
      TutorClase: new FormControl("", []),



    });
  }
  onUpdate(): void {
    this.usuariosService.update(this.userID, this.userForm.value).subscribe((user) => {
      this.router.navigate(["/admin/usuarios"]);
    });
   }

  onSubmit(): void {
    this.usuariosService.create(this.userForm.value).subscribe((user) => {
      this.router.navigate(["/admin/usuarios"]);
    });

  }
  onChange() {
    this.userRol = (document.getElementById("TipoUsuario") as HTMLSelectElement).value;
  }

  changeEmpresa() {
    console.log((document.getElementById("Empresa") as HTMLSelectElement).value);

    if (parseInt((document.getElementById("Empresa") as HTMLSelectElement).value) > 0) {
      console.log((document.getElementById("Empresa") as HTMLSelectElement).value);
      this.empresaId = parseInt((document.getElementById("Empresa") as HTMLSelectElement).value);
      this.tutoresEmpresa$ = this.empresasService.fetchTutoresEmpresa(this.empresaId);
    }
  }

  changeCentro() {
    if (parseInt((document.getElementById("Centro") as HTMLSelectElement).value) > 0) {
      this.centroId = parseInt((document.getElementById("Centro") as HTMLSelectElement).value);
      this.tutoresClase$ = this.centrosService.fetchTutoresCentro(this.centroId);
    }
  }


  obtenerTutorClase(userID: number) {
   return new Promise((resolve, reject) => {
      this.tutorCService.fetchById(userID).pipe().subscribe((tutor) => {
        resolve(tutor);
      });
    }); 
  }

  obtenerTutorTrabajo(userID: number) {
    return new Promise<Tutorestrabajo>((resolve, reject) => {
       this.tutoreService.fetchById(userID).pipe().subscribe((tutor) => {
         resolve(tutor);
       });
     }); 
   }


}


