import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';
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
  userAdmin!:boolean;
  userAdminCentro!:boolean;

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute, private router: Router, private cookieService: CookieService) { }
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

    this.userForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      Nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      Apellidos: new FormControl("", [Validators.required, Validators.minLength(8)]),
      CorreoElectronico: new FormControl("", [Validators.required, Validators.email]),
      TipoUsuario: new FormControl("", [Validators.required]),
     


    });
  }
  onUpdate(): void { }

  onSubmit(): void {
    this.usuariosService.create(this.userForm.value).pipe().subscribe((user) => {
      this.router.navigate(["/admin/usuarios"]);
    },
      (error: any) => {
        console.log(error);
      }
    );
   }
}


