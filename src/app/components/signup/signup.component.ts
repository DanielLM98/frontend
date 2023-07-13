import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl("", [Validators.required, Validators.minLength(3)]),
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      contrasena: new FormControl("", [Validators.required, Validators.minLength(8)]),

    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg));
  }
}

