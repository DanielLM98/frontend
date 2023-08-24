import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/Empresa';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit{

  empresas$!: Observable<Empresa[]>; 

  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  empresasArray: Empresa[] = [];
  empObs$: Observable<any> = new Observable();




  constructor(private empresasService: EmpresasService, private authService: AuthService) { }
  ngOnInit(): void {
    this.empresas$ = this.empresasService.fetchAll();
    this.cargarDatos()
  }


  cargarDatos():void{
    console.log(this.page)
    const startIndex = (this.page-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(endIndex)
    this.empresas$.subscribe(
      (data) => {
        console.log(data)

        this.empresasArray = data;
        this.totalPages = Math.ceil(this.empresasArray.length / this.itemsPerPage);
        this.empresasArray = this.empresasArray.slice(startIndex, endIndex);
        this.empObs$ = new Observable((observer) => {
          observer.next(this.empresasArray);
          observer.complete();
        });
        console.log(this.empObs$)
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
  eliminarEmpresa(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar esta empresa?")) {
      this.empresasService.delete(id).subscribe(
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






