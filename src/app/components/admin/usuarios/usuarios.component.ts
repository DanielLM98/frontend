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

  constructor(private usuariosService: UsuariosService, private authService: AuthService) { }
  ngOnInit(): void {
    this.usuarios$ = this.usuariosService.fetchAll();
  }
}
