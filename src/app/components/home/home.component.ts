import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, from } from 'rxjs';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';
import { RespuestasService } from 'src/app/services/respuestas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formularios$!: Observable<Formulario[]>;
  formRespondidos!: number[];
  isFormEdit: boolean = false;
  totalPages: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  formulariosArr: Formulario[] = [];
  formObs$: Observable<any> = new Observable();



  constructor(private formulariosService: FormulariosService, private cookieService: CookieService, private router: Router, private respuestasService: RespuestasService) { }

  ngOnInit(): void {

    let rol = JSON.parse(this.cookieService.get("user")).TipoUsuario;
    this.respuestasService.getRespuestasbyUser(JSON.parse(this.cookieService.get("user")).ID).subscribe(
      (data) => {
        this.formRespondidos = data.map((item: Number) => item);
        console.log(this.formRespondidos)
      }
    )

    if (rol === "Administrador") {
      this.router.navigate(['admin/usuarios']);
    }
    else {
      this.formularios$ = this.formulariosService.getFormulariosbyRol(rol);
      this.cargarDatos();

      console.log(this.formularios$)

    }

  }

  isEdit(id: number) {
   
    return this.formRespondidos.includes(id);
  }
  downloadFile(id: number) {
    this.formulariosService.fetchById(id).subscribe(
      (data) => {
        let form = data;
        this.formulariosService.downloadFile(id).subscribe(
          (data) => {
            console.log(form)
            const link = document.getElementById("downloadLink")
            if (link instanceof HTMLAnchorElement) {
              link.href = 'http://localhost:3000/' + data;
              link.target = "_blank";
              link.download = form.Nombre + ".pdf";
              link.click();
            }

          }
        )
      });
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

  



}
