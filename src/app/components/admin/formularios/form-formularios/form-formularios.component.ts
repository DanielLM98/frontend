import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';
import * as DOMPurify from 'dompurify';

@Component({
  selector: 'app-form-formularios',
  templateUrl: './form-formularios.component.html',
  styleUrls: ['./form-formularios.component.css']
})
export class FormFormulariosComponent implements OnInit {
  FormulariosForm!: FormGroup;
  ExisteFormulario!: boolean;
  Formulario!: Formulario;
  FormularioId!: number;
  private fileTmp: any;
  private archivos: any;


  constructor(private formulariosService: FormulariosService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.FormulariosForm = this.createFormGroup();

    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.FormularioId = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(this.FormularioId).pipe().subscribe((form) => {
        this.Formulario = form;
        if (form == null) {
          this.ExisteFormulario = false;
        } else {
          this.ExisteFormulario = true;
          console.log(this.Formulario)
          console.log(this.FormulariosForm.value)
          this.FormulariosForm.patchValue(this.Formulario);
        }
      });
    }
  }

  onUpdate(): void {
       this.formulariosService.update(this.FormularioId,this.FormulariosForm.value).pipe().subscribe((form) => {
      console.log(form);
    });

    
  }
  sanitizeHtml(html: string): string {
    const sanitizedHtml: SafeHtml = this.sanitizer.sanitize(SecurityContext.HTML, html) as string;
    console.log(sanitizedHtml);
    let sanitizedString = DOMPurify.sanitize(sanitizedHtml.toString());
    console.log(sanitizedString)
    sanitizedString = "<form [ngSubmit]='onSubmit()' novalidate>" + sanitizedString + "</form>";
    return sanitizedString;
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('Nombre', this.FormulariosForm.get('Nombre')!.value);
    formData.append('Descripcion', this.FormulariosForm.get('Descripcion')!.value);
    formData.append('Campos', this.FormulariosForm.get('Campos')!.value);
    formData.append('Rol', this.FormulariosForm.get('Rol')!.value);
    formData.append('Archivo', this.archivos);
  
    console.log(formData);
    this.formulariosService.create(formData).pipe().subscribe((form) => {
      console.log(form);
    }
    );


  }


  createFormGroup(): FormGroup {
    return new FormGroup({
      Nombre: new FormControl("", [Validators.required, Validators.minLength(8)]),
      Descripcion: new FormControl("", [Validators.required, Validators.minLength(8)]),
      Campos: new FormControl("", [Validators.required]),
      Rol: new FormControl("", [Validators.required]),
      Archivo: new FormControl(null, [Validators.required,]),



    });
  }

  getFile($event: any): void {
    console.log($event.target.files[0])
    if ($event.target.files[0].type == "application/pdf") {
      let archivo = $event.target.files[0];
      this.archivos = archivo;
    } else {
      alert("El archivo debe ser un pdf");
      this.FormulariosForm.get('archivo')!.setValue(null);
    }

  }

}
