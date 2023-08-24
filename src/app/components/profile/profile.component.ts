import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user!: User;
  ChangeForm!: FormGroup
  EditForm!: FormGroup
  constructor(private cookieService:CookieService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get("user")!);
    this.ChangeForm = this.createFormGroupPassword();
    this.EditForm = this.createFormGroup();
  }


  createFormGroup(): FormGroup {
    return new FormGroup({
      Nombre: new FormControl(this.user.Nombre, [Validators.required]),
      Apellido: new FormControl(this.user.Apellido, [Validators.required]),
    });
  }
  createFormGroupPassword(): FormGroup {
    return new FormGroup({
      Actual: new FormControl("", [Validators.required]),
      Nueva: new FormControl("", [Validators.required , Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$")]),
      Confirmar: new FormControl("", [Validators.required,  this.checkConfirmPassword] ),
    });
  }

  edit(): void {
    if(document.getElementById('changePassword')!.style.display == 'block'){
      document.getElementById('changePassword')!.style.display = 'none';
    }
    if(document.getElementById('editPerfil')!.style.display == 'block'){
      document.getElementById('editPerfil')!.style.display = 'none';
      this.EditForm.patchValue({
        Nombre: this.user.Nombre,
        Apellido: this.user.Apellido,
      });
    }else{
    document.getElementById('editPerfil')!.style.display = 'block';
  }
  }
  editPerfil(){
    console.log(this.EditForm.value)
    this.usuariosService.updatePerfil(this.user.ID, this.EditForm.value).subscribe(
      (response) => {
        document.getElementById('editPerfil')!.style.display = 'none';
        this.EditForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiarContrasena(): void {
    if(document.getElementById('editPerfil')!.style.display == 'block'){
      document.getElementById('editPerfil')!.style.display = 'none';
    }
    if(document.getElementById('changePassword')!.style.display == 'block'){
      document.getElementById('changePassword')!.style.display = 'none';
    }else{

    document.getElementById('changePassword')!.style.display = 'block';
    }
  }
  checkConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    (control.value?.toString() === this.ChangeForm.value.toString()
      ? null : { noMatch: true })
  }
  resetPassword(id:number){
    this.usuariosService.changePassword(id, this.ChangeForm.value).subscribe(
      (response) => {
        document.getElementById('changePassword')!.style.display = 'none';
        this.ChangeForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
    document.getElementById('changePassword')!.style.display = 'none';
  }
}
