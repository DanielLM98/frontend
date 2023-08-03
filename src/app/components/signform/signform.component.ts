import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';



@Component({
  selector: 'app-signform',
  templateUrl: './signform.component.html',
  styleUrls: ['./signform.component.css']
})
export class SignformComponent implements OnInit {
  formulario!: Formulario;
  signForm!: FormGroup;

  @ViewChild('formularioRef', { static: false }) formularioRef!: ElementRef;
  @Input() campos!: string;

  constructor(private formulariosService: FormulariosService, private route: ActivatedRoute, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.signForm = new FormGroup({});
    if (+this.route.snapshot.paramMap.get('id')! > 0) {
      let formularioID = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(formularioID).pipe().subscribe((formulario) => {
        this.formulario = formulario;
        // this.renderer.setProperty(this.formularioRef.nativeElement, 'innerHTML', this.formulario.Campos);
        this.formularioRef.nativeElement.innerHTML = this.formulario.Campos;
        console.log(this.formulario.Campos)
        const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
        console.log(inputs)
        inputs.forEach((input: any) => {
          input.setAttribute('formControlName', input.attributes.formcontrolname.value)
          console.log(input)
          this.signForm.addControl(input.attributes.formcontrolname.value, new FormControl('', Validators.required));
        });
        console.log(inputs)

      });
    }
  }

  onSubmit() {
    const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
    inputs.forEach((input: any) => {
      console.log(input.value)
      console.log(input.attributes.formcontrolname.value)
      this.signForm.controls[input.attributes.formcontrolname.value].setValue(input.value);
    });
    console.log(this.formulario)
    console.log(JSON.parse(this.cookieService.get('user')))
    this.formulariosService.rellenar(JSON.parse(this.cookieService.get('user')).id, this.formulario.ID, JSON.stringify(this.signForm.value)).subscribe(
      (data) => {
        console.log(data)
      }
    )

    console.log(this.signForm.value)  }


}
