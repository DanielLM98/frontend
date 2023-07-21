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
  userId!: Pick<User, "id">;

  constructor(private centrosService: CentrosService, private authService: AuthService) { }
  ngOnInit(): void {
    this.centros$ = this.centrosService.getAll();
    this.userId = this.authService.userId;
  }

  //Usar el fetchall de centrosService para obtener los centros





}
