import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/Empresa';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit{

  empresas$!: Observable<Empresa[]>; 

  constructor(private empresasService: EmpresasService, private authService: AuthService) { }
  ngOnInit(): void {
    this.empresas$ = this.empresasService.fetchAll();

    console.log(this.empresas$)
  }


}

  //Usar el fetchall de centrosService para obtener los centros






