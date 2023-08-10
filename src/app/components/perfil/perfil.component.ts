<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> main

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
<<<<<<< HEAD
export class PerfilComponent {
=======
export class PerfilComponent implements OnInit{
  usuario!:User

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(this.cookieService.get("user"));
  }
 
>>>>>>> main

}
