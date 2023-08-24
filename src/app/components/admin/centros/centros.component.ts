import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CentrosService } from 'src/app/services/centros.service';


@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit{

  centros$!: Observable<Centro[]>; 
  userId!: Pick<User, "ID">;

  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  centrosArr: Centro[] = [];
  centroObs$: Observable<any> = new Observable();


  constructor(private centrosService: CentrosService, private authService: AuthService) { }
  ngOnInit(): void {
    this.centros$ = this.centrosService.fetchAll();
    this.userId = this.authService.userId;
    this.cargarDatos()
  }


  cargarDatos():void{
    console.log(this.page)
    const startIndex = (this.page-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(endIndex)
    this.centros$.subscribe(
      (data) => {
        console.log(data)

        this.centrosArr = data;
        this.totalPages = Math.ceil(this.centrosArr.length / this.itemsPerPage);
        this.centrosArr = this.centrosArr.slice(startIndex, endIndex);
        this.centroObs$ = new Observable((observer) => {
          observer.next(this.centrosArr);
          observer.complete();
        });
        console.log(this.centroObs$)
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


eliminarCentro(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar este centro?")) {
      this.centrosService.delete(id).subscribe(
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
