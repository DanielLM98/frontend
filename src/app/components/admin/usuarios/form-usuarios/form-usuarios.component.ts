import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {
  userForm!: FormGroup

  userID!: number;
  user!: User;
  ExisteUser!: boolean;
  
  constructor(private usuariosService:UsuariosService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {


  }

  onUpdate():void {}

  onSubmit():void {}
}
