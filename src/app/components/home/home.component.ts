import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formularios$!: Observable<Formulario[]>;

  constructor(private formulariosService: FormulariosService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {

    let rol = JSON.parse(this.cookieService.get("user")).TipoUsuario;

    if (rol === "Administrador") {
      this.router.navigate(['admin/usuarios']);
    }
    else {
      this.formularios$ = this.formulariosService.getFormulariosbyRol(rol);
      console.log(this.formularios$)

    }

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
              link.click();
              link.download = form.Nombre + ".pdf";
            }
            document.createElement('a').href
            this.router.navigate(['http://localhost:3000/' + data]);
          }
        )
      });
  }


}
