import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit{
  recoveryForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.recoveryForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  recovery(): void {
    console.log("hola")
    this.authService.recoveryPassword(this.recoveryForm.value).subscribe(
      (error) => {
        console.log(error);
      }
    );

  }
}
