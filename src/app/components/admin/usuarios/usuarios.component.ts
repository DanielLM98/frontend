import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios$!: Observable<User[]>; 
  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  userArr: User[] = [];
  userObs$: Observable<any> = new Observable();


  constructor(private usuariosService: UsuariosService, private authService: AuthService) { }
  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.fetchAll();
    this.cargarDatos();
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
  cargarDatos():void{
    const startIndex = (this.page-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
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

    )
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

}
