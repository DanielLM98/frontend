import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-centros',
  templateUrl: './form-centros.component.html',
  styleUrls: ['./form-centros.component.css']
})
export class FormCentrosComponent implements OnInit {
  centrosForm!: FormGroup;

  constructor() { }


  ngOnInit(): void {
    this.centrosForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(8)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(8)]),
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required, Validators.minLength(8)]),


    });
  }

  crearCentro(): void {
  }
}

