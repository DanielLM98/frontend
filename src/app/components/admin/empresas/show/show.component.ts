import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { User } from 'src/app/models/User';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-showempresas',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowEmpresasComponent implements OnInit {
  empresa!: Centro;
  idEmpresa!: number;
  usuarios$!: Observable<User[]>; 
  tutores$!: Observable<User[]>;
  constructor(private usuariosService:UsuariosService,private empresasService: EmpresasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.idEmpresa = parseInt(this.route.snapshot.paramMap.get('id')!);

      this.empresasService.fetchById(this.idEmpresa).subscribe((empresa) => {
        this.empresa = empresa;
      }, (error) => {
        console.log(error);
      });
      this.usuarios$=this.empresasService.fetchAlumnosEmpresa(this.idEmpresa)
      this.tutores$=this.empresasService.fetchTutoresEmpresa(this.idEmpresa)
      
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