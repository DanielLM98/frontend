import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-signform',
  templateUrl: './signform.component.html',
  styleUrls: ['./signform.component.css']
})
export class SignformComponent implements OnInit {
formulario!: Formulario;

  constructor(private formulariosService: FormulariosService ,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(+this.route.snapshot.paramMap.get('id')! > 0){
      let formularioID = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(formularioID).pipe().subscribe((formulario) => {
        this.formulario = formulario;
      }
      );
    }
  }
}
