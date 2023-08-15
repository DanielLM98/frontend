import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { User } from 'src/app/models/User';
import { CentrosService } from 'src/app/services/centros.service';

@Component({
  selector: 'app-showcentros',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowCentrosComponent implements OnInit {
  centro!: Centro;
  idCentro!: number;
  usuarios$!: Observable<User[]>; 
  constructor(private centrosService: CentrosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      this.idCentro = parseInt(this.route.snapshot.paramMap.get('id')!);

      this.centrosService.fetchById(this.idCentro).subscribe((centro) => {
        this.centro = centro;
      }, (error) => {
        console.log(error);
      });
      this.usuarios$=this.centrosService.obtenerAlumnos(this.idCentro)
      
    }
  }
}