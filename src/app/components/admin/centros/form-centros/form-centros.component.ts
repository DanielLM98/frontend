import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  constructor(private centrosService:CentrosService) { }


  ngOnInit(): void {
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
    this.centrosService.create(this.centrosForm.value).subscribe((msg) => console.log(msg));
  }
}

