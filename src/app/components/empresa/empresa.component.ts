import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from 'src/app/models/Empresa';
import { User } from 'src/app/models/User';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  User: User = JSON.parse(this.cookieService.get('user') || '{}');
  empresa!:Empresa;
  constructor(private cookieService:CookieService, private empresaService:EmpresasService, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getEmpresa(this.User.ID).subscribe(
      data => {
        this.empresa = data;
      });

  }
}
