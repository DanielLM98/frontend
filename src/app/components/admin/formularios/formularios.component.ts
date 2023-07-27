import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/models/FormField';
import { FormFieldOptions } from 'src/app/models/FormFieldOptions';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit{
  formularios$!: Observable<Formulario[]>; 

  constructor( private formulariosService: FormulariosService) { }

  ngOnInit(): void {
  this.formularios$ = this.formulariosService.fetchAll();
  console.log(this.formularios$)
  }

  delete(id: number): void {
    this.formulariosService.delete(id).subscribe((msg) => console.log(msg));
    this.formularios$ = this.formulariosService.fetchAll();
    this,window.location.reload();
  }
}
