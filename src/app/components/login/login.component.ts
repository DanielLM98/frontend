import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      contrasena: new FormControl("", [Validators.required, Validators.minLength(8)]),

    });
  }

  login(): void {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value.correoElectronico, this.loginForm.value.contrasena).subscribe();
}
}