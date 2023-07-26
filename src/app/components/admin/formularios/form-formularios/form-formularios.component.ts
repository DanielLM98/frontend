import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Formulario } from 'src/app/models/Formulario';

@Component({
  selector: 'app-form-formularios',
  templateUrl: './form-formularios.component.html',
  styleUrls: ['./form-formularios.component.css']
})
export class FormFormulariosComponent {
  FormulariosForm!: FormGroup;
  InputForm!: FormGroup;
  ExisteFormulario!: boolean;
  Formulario!: Formulario;

  constructor() { }

  

 
  onSubmit(): void {
  }
}
