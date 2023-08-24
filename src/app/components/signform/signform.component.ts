import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Formulario } from 'src/app/models/Formulario';
import { FormulariosService } from 'src/app/services/formularios.service';
import { RespuestasService } from 'src/app/services/respuestas.service';



@Component({
  selector: 'app-signform',
  templateUrl: './signform.component.html',
  styleUrls: ['./signform.component.css']
})
export class SignformComponent implements OnInit {
  formulario!: Formulario;
  signForm!: FormGroup;
  editando: boolean = false;
  respuestaID!: number;

  @ViewChild('formularioRef', { static: false }) formularioRef!: ElementRef;
  @Input() campos!: string;

  constructor(private respuestasService: RespuestasService, private formulariosService: FormulariosService, private route: ActivatedRoute, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
    this.signForm = new FormGroup({});
    if (+this.route.snapshot.paramMap.get('id')! > 0 && this.route.snapshot.paramMap.get('opcion') === "rellenar") {
      let formularioID = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(formularioID).pipe().subscribe((formulario) => {
        this.formulario = formulario;
        this.respuestasService.getRespuestas(+this.route.snapshot.paramMap.get('id')!).subscribe(
          (data) => {
            this.respuestaID = data.ID;
            if(data.ID != null){
              this.router.navigate(['/form', formularioID, 'edit']);
            }
          }, (error) => {
            console.log(error)
          }
        )

        // this.renderer.setProperty(this.formularioRef.nativeElement, 'innerHTML', this.formulario.Campos);
        this.formularioRef.nativeElement.innerHTML = this.formulario.Campos;
        const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
        inputs.forEach((input: any) => {
          input.setAttribute('formControlName', input.attributes.formcontrolname.value)
          this.signForm.addControl(input.attributes.formcontrolname.value, new FormControl('', Validators.required));
        });
      });
    }
    if (+this.route.snapshot.paramMap.get('id')! > 0 && this.route.snapshot.paramMap.get('opcion') === "edit") {
      this.editando = true;
      let formularioID = +this.route.snapshot.paramMap.get('id')!;
      this.formulariosService.fetchById(formularioID).pipe().subscribe((formulario) => {
        this.formulario = formulario;
        this.formularioRef.nativeElement.innerHTML = this.formulario.Campos;
        const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
        console.log(inputs)
        inputs.forEach((input: any) => {
          input.setAttribute('formControlName', input.attributes.formcontrolname.value)
          this.signForm.addControl(input.attributes.formcontrolname.value, new FormControl('', Validators.required));
        });
      });

      this.respuestasService.getRespuestas(+this.route.snapshot.paramMap.get('id')!).subscribe(
        (data) => {
          this.respuestaID = data.ID;
          this.signForm.patchValue(JSON.parse(data.Respuestas))
          const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
          inputs.forEach((input: any) => {
            if(input.type === "select"){
              input.selected = JSON.parse(data.Respuestas)[input.attributes.formcontrolname.value]
            }
            input.value = JSON.parse(data.Respuestas)[input.attributes.formcontrolname.value]
          });
        }, (error) => {
          console.log(error)
        }
      )
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
    this.respuestasService.rellenar(JSON.parse(this.cookieService.get('user')).ID, this.formulario.ID, JSON.stringify(this.signForm.value)).subscribe(
      (data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      }
    )
    console.log(this.signForm.value)
  }

  onUpdate() {
    const inputs = this.formularioRef.nativeElement.querySelectorAll('input, select, textarea');
    inputs.forEach((input: any) => {
      console.log(input.value)
      console.log(input.attributes.formcontrolname.value)
      this.signForm.controls[input.attributes.formcontrolname.value].setValue(input.value);
    });
    console.log(JSON.parse(this.cookieService.get('user')))
    this.respuestasService.updateRespuestas(this.respuestaID, JSON.stringify(this.signForm.value)).subscribe(
      (data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      }
    )
    console.log(this.signForm.value)
  }


}
