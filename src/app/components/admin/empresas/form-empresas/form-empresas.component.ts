import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Centro } from 'src/app/models/Centro';
import { Empresa } from 'src/app/models/Empresa';
import { AdmincentroService } from 'src/app/services/admincentro.service';
import { CentrosService } from 'src/app/services/centros.service';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styleUrls: ['./form-empresas.component.css']
})
export class FormEmpresasComponent implements OnInit {
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  empresasForm!: FormGroup;
  empresaId!: number;
  Empresa!: Empresa;
  ExisteEmpresa!: boolean;
  centros$!: Observable<Centro[]>;
  userRole!: string;

  constructor(private adminCentroService: AdmincentroService,private cookieService:CookieService ,private centrosService:CentrosService ,private empresasService:EmpresasService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.userRole = JSON.parse(this.cookieService.get("user")).TipoUsuario;
    if(+this.route.snapshot.paramMap.get('id')! > 0){
      this.empresaId = +this.route.snapshot.paramMap.get('id')!;
      this.empresasService.fetchById(this.empresaId).pipe().subscribe((empresa) => {
        console.log(empresa);
        this.Empresa = empresa;
        if(empresa==null){
          this.ExisteEmpresa = false;
        }else{
          this.ExisteEmpresa = true;
          this.empresasForm.patchValue(this.Empresa);
        }
      });
    }
    if(this.userRole == "Administrador"){
      this.centros$ = this.centrosService.fetchAll();
    }else if(this.userRole == "AdministradorCentro"){
      this.adminCentroService.fetchById(JSON.parse(this.cookieService.get("user")).id).subscribe((centro) => {
        this.centros$ = this.centrosService.fetchEmpresasCentro(centro.IDCentro);
      });

    }
    this.empresasForm = this.createFormGroup();

    

  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(8)]),
      direccion: new FormControl("", [Validators.required, Validators.minLength(8)]),
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required, Validators.minLength(8)]),
      centro: new FormControl("", [Validators.required]),


    });
  }

  onSubmit(): void {
    console.log(this.empresasForm.value)

    this.empresasService.create(this.empresasForm.value).subscribe((msg) => {console.log(msg);
    this.router.navigate(['/admin/empresas']);
  })}

  onUpdate(): void {

    this.empresasService.update(this.empresaId,this.empresasForm.value).subscribe((msg) => {console.log(msg);
      this.router.navigate(['/admin/empresas']);
    })}
  fetchById(): void {
    this.empresasService.fetchById(this.empresaId).subscribe((empresa) => {
      this.Empresa = empresa as Empresa;
    });
  }
}

