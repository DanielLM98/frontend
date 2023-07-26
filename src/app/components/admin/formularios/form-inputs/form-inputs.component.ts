import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormField } from 'src/app/models/FormField';
import { FormFieldOptions } from 'src/app/models/FormFieldOptions';

@Component({
  selector: 'app-form-inputs',
  templateUrl: './form-inputs.component.html',
  styleUrls: ['./form-inputs.component.css']
})
export class FormInputsComponent implements OnInit{

  formFields: FormField[] = [];
  formFieldOptions: FormFieldOptions[] = [];
  idForm!:number;
  InputForm!: FormGroup;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(+this.route.snapshot.paramMap.get('id')! > 0){
      this.idForm = +this.route.snapshot.paramMap.get('id')!;
    }
  }
  agregarCampo(tipo: string, etiqueta: string, nombre: string, valor?: any): void {
    this.formFields.push({ type: this.InputForm.value.tipo, label: this.InputForm.value.etiqueta, name: this.InputForm.value.nombre, value: this.InputForm.value.valor });
    if(this.InputForm.value.tipo == "select" || this.InputForm.value.tipo == "checkbox" || this.InputForm.value.tipo == "radio"){
      this.formFieldOptions.push({ value: this.InputForm.value.value, label: this.InputForm.value.label });
    }
  }
  agregarOpcion(value: string, label: string): void {
    this.formFieldOptions.push({ value: value, label: label });
  }


  onChangeTipo(): void {
    let select = document.getElementById("tipo") as HTMLInputElement;
    let tipo = select.value;
    let selche = document.getElementById("selche") as HTMLInputElement;
    let minmax = document.getElementById("minmax") as HTMLInputElement;

    if (tipo == "select") {
      selche.style.display = "block";
      minmax.style.display = "none";
    } else if (tipo == "checkbox") {
      selche.style.display = "block";
      minmax.style.display = "none";
    } else if (tipo == "number") {
      selche.style.display = "none";
      minmax.style.display = "block";
    } else if (tipo == "range") {
      selche.style.display = "none";
      minmax.style.display = "block";
    } else if (tipo == "radio") {
      selche.style.display = "block";
      minmax.style.display = "none";
    }
  }

  numeroOpciones(): void {
    let select = document.getElementById("numeroOpciones") as HTMLInputElement;
    let numeroOpciones = Number(select.value);
    let opciones = document.getElementById("opciones") as HTMLInputElement;
    let numerohijos = opciones.childNodes.length;
      for (let i= numerohijos; i < numeroOpciones; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = "opcion" + i;
        input.id = "opcion" + i;
        input.placeholder = "Opción " + (i + 1);
        input.className = "form-control";
        opciones.appendChild(input);
      
    }
   
  }

  onSubmit(): void {
    console.log(this.formFields);
    console.log(this.formFieldOptions);
  }
}
