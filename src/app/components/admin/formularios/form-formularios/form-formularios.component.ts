import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';
import DOMPurify from 'dompurify';


@Component({
  selector: 'app-form-formularios',
  templateUrl: './form-formularios.component.html',
  styleUrls: ['./form-formularios.component.css']
})
export class FormFormulariosComponent implements OnInit{
  FormulariosForm!: FormGroup;
  ExisteFormulario!: boolean;
  Formulario!: Formulario;
  FormularioId!: number;
  private fileTmp:any;
  private archivos:any;
  

  constructor(private formulariosService: FormulariosService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.FormulariosForm = this.createFormGroup();

    if(+this.route.snapshot.paramMap.get('id')! > 0){
      this.FormularioId = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(this.FormularioId).pipe().subscribe((form) => {
        console.log(form);
        this.Formulario = form;
        if(form==null){
          this.ExisteFormulario = false;
        }else{
          this.ExisteFormulario = true;
          this.FormulariosForm.patchValue(this.Formulario);
        }
      });
    }
  }
  
  sanitizeHtml(html: string): string {
    const sanitizedHtml: SafeHtml = this.sanitizer.sanitize(SecurityContext.HTML,html) as string;
    console.log(sanitizedHtml);
    let sanitizedString = DOMPurify.sanitize(sanitizedHtml.toString());
    console.log(sanitizedString)
    sanitizedString = "<form [ngSubmit]='onSubmit()' novalidate>" + sanitizedString + "</form>";
    return sanitizedString;
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('nombre', this.FormulariosForm.get('nombre')!.value);
    formData.append('descripcion', this.FormulariosForm.get('descripcion')!.value);
    formData.append('campos', this.FormulariosForm.get('campos')!.value);
    formData.append('rol', this.FormulariosForm.get('rol')!.value);
    formData.append('archivo', this.archivos);

    console.log(formData);
    this.formulariosService.create(formData).pipe().subscribe((form) => {
      console.log(form);
    }
    );

    
  }
  

  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(8)]),
      descripcion: new FormControl("", [Validators.required, Validators.minLength(8)]),
      campos: new FormControl("", [Validators.required]),
      rol: new FormControl("", [Validators.required]),
      archivo: new FormControl(null, [Validators.required,]),
     


    });
  }

  getFile( $event: any ): void {
    const archivo = $event.target.files[0];
    this.archivos = archivo;

    }
    
}
