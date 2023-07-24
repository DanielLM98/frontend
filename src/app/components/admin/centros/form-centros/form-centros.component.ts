import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Centro } from 'src/app/models/Centro';
import { CentrosService } from 'src/app/services/centros.service';

@Component({
  selector: 'app-form-centros',
  templateUrl: './form-centros.component.html',
  styleUrls: ['./form-centros.component.css']
})
export class FormCentrosComponent implements OnInit {
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  centrosForm!: FormGroup;
  centroId!: number;
  Centro!: Centro;
  ExisteCentro!: boolean;
  constructor(private centrosService:CentrosService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    if(+this.route.snapshot.paramMap.get('id')! > 0){
      this.centroId = +this.route.snapshot.paramMap.get('id')!;
      this.centrosService.fetchById(this.centroId).pipe().subscribe((centro) => {
        console.log(centro);
        this.Centro = centro;
        if(centro==null){
          this.ExisteCentro = false;
        }else{
          this.ExisteCentro = true;
          this.centrosForm.patchValue(this.Centro);
        }
      });
    }
    this.centrosForm = this.createFormGroup();

    

  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(8)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(8)]),
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required, Validators.minLength(8)]),


    });
  }

  onSubmit(): void {
    console.log(this.centrosForm.value)

    this.centrosService.create(this.centrosForm.value).subscribe((msg) => console.log(msg));
  }

  onUpdate(): void {

    this.centrosService.update(this.centroId,this.centrosForm.value).subscribe((msg) => console.log(msg));
  }

  fetchById(): void {
    this.centrosService.fetchById(this.centroId).subscribe((centro) => {
      this.Centro = centro as Centro;
    });
  }
}

