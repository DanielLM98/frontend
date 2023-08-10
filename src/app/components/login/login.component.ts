import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  showPwd: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAutenticated()){
      this.authService.isUserLoggedIn$.next(true);
      this.router.navigate(['']);
    }

    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      contrasena: new FormControl("", [Validators.required, Validators.minLength(8)]),

    });
  }

  login(): void {
    this.authService.login(this.loginForm.value.correoElectronico, this.loginForm.value.contrasena).subscribe(
      (data) => {
        if(data==undefined){
          this.errorMessage = "Correo o contraseña incorrectos";
        }
      }
    );
    console.log(this.errorMessage)

}

  showPassword():void {
    let x = document.getElementById("contrasena") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
      this.showPwd = true;
    } else {
      x.type = "password";
      this.showPwd = false;
    }

  }
}