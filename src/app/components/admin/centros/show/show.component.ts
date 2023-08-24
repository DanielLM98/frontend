import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { User } from 'src/app/models/User';
import { CentrosService } from 'src/app/services/centros.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-showcentros',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowCentrosComponent implements OnInit {
  centro!: Centro;
  idCentro!: number;
  usuarios$!: Observable<User[]>; 
  tutores$!: Observable<User[]>;
  
  constructor(private usuariosService:UsuariosService ,private centrosService: CentrosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.idCentro = parseInt(this.route.snapshot.paramMap.get('id')!);

      this.centrosService.fetchById(this.idCentro).subscribe((centro) => {
        this.centro = centro;
      }, (error) => {
        console.log(error);
      });
      this.usuarios$=this.centrosService.obtenerAlumnos(this.idCentro)
      this.tutores$=this.centrosService.fetchTutoresCentro(this.idCentro)
      this.cargarDatos();
      
    }
  }

  isTutor: boolean = false;
  isAlumno: boolean = true;

  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  userArr: User[] = [];
  userObs$: Observable<any> = new Observable();
  cargarDatos():void{
    const startIndex = (this.page-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if(this.isAlumno){
    this.usuarios$.subscribe(
      (data) => {
        this.userArr = data;
        this.totalPages = Math.ceil(this.userArr.length / this.itemsPerPage);
        this.userArr = this.userArr.slice(startIndex, endIndex);
        console.log(this.userArr)
        this.userObs$ = new Observable((observer) => {
          observer.next(this.userArr);
          observer.complete();
        });
      },
      (error) => {
        console.log(error);
      }

    )}else{
      this.tutores$.subscribe(
        (data) => {
          this.userArr = data;
          this.totalPages = Math.ceil(this.userArr.length / this.itemsPerPage);
          this.userArr = this.userArr.slice(startIndex, endIndex);
          console.log(this.userArr)
          this.userObs$ = new Observable((observer) => {
            observer.next(this.userArr);
            observer.complete();
          });
        },
        (error) => {
          console.log(error);
        }
  
      )
    }
  }
  nextPage() {
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

  eliminarUsuario(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
      this.usuariosService.delete(id).subscribe(
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

    alumnos(){
      this.isTutor = false;
      this.isAlumno= true;
      this.cargarDatos();

    }

    tutores(){
      this.isTutor = true;
      this.isAlumno= false;
      this.cargarDatos();
    }
}