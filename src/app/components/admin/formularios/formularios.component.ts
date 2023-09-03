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
  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  formulariosArr: Formulario[] = [];
  formObs$: Observable<any> = new Observable();



  constructor( private formulariosService: FormulariosService) { }

  ngOnInit(): void {
  this.formularios$ = this.formulariosService.fetchAll();
  this.cargarDatos()
}

  delete(id: number): void {
    this.formulariosService.delete(id).subscribe((msg) => console.log(msg));
    this.formularios$ = this.formulariosService.fetchAll();
    this,window.location.reload();
  }

  cargarDatos():void{
    console.log(this.page)
    const startIndex = (this.page-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(endIndex)
    this.formularios$.subscribe(
      (data) => {
        console.log(data)

        this.formulariosArr = data;
        this.totalPages = Math.ceil(this.formulariosArr.length / this.itemsPerPage);
        this.formulariosArr = this.formulariosArr.slice(startIndex, endIndex);
        this.formObs$ = new Observable((observer) => {
          observer.next(this.formulariosArr);
          observer.complete();
        });
        console.log(this.formObs$)
      },
      (error) => {
        console.log(error);
      }

    )
  }
  nextPage() {
    console.log(this.page)
    console.log(this.totalPages)
    if (this.page <= this.totalPages) {
      this.page++;
      this.cargarDatos();
      
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.cargarDatos();

    }
  }

  eliminarFormulario(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar este formulario?")) {
      this.formulariosService.delete(id).subscribe(
        (data) => {
          console.log(data);
          this.cargarDatos();
        },
        (error) => {
          console.log(error);
        }
      );
      }
    }
}
