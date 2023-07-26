import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CentrosComponent } from './components/admin/centros/centros.component';
import { FormCentrosComponent } from './components/admin/centros/form-centros/form-centros.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { FormulariosComponent } from './components/admin/formularios/formularios.component';
import { FormInputsComponent } from './components/admin/formularios/form-inputs/form-inputs.component';
import { FormFormulariosComponent } from './components/admin/formularios/form-formularios/form-formularios.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuardService]},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "usuarios", component: UsuariosComponent},
  { path: "forgot-password", component: ForgotpasswordComponent},

  { path: "admin/centros", component: CentrosComponent, canActivate: [AuthGuardService]},
  { path: "admin/centros/:id/edit", component: FormCentrosComponent, canActivate: [AuthGuardService]},
  { path: "admin/centros/create", component: FormCentrosComponent, canActivate: [AuthGuardService]},
  { path: "admin/formularios", component: FormulariosComponent, canActivate: [AuthGuardService]},
  { path: "admin/formularios/:id/edit", component: FormFormulariosComponent, canActivate: [AuthGuardService]},
  { path: "admin/formularios/create", component: FormFormulariosComponent, canActivate: [AuthGuardService]},
  { path: "admin/formularios/:id/inputs", component: FormInputsComponent, canActivate: [AuthGuardService]},
  { path: "**", redirectTo: ""}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
