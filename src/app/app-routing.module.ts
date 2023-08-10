import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CentrosComponent } from './components/admin/centros/centros.component';
import { FormCentrosComponent } from './components/admin/centros/form-centros/form-centros.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormulariosComponent } from './components/admin/formularios/formularios.component';
import { FormFormulariosComponent } from './components/admin/formularios/form-formularios/form-formularios.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { FormUsuariosComponent } from './components/admin/usuarios/form-usuarios/form-usuarios.component';
import { FormEmpresasComponent } from './components/admin/empresas/form-empresas/form-empresas.component';
import { SignformComponent } from './components/signform/signform.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuardService]},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: "resetPassword", component: ResetPasswordComponent},

  { path: "usuarios", component: UsuariosComponent},
  { path: "form/:id/rellenar", component: SignformComponent, canActivate: [AuthGuardService]},
  { path: "perfil", component: PerfilComponent, canActivate: [AuthGuardService]},

  //admin
  { path: "admin/centros", component: CentrosComponent, canActivate: [AuthGuardService] , data: {roles: ["Administrador"]}},
  { path: "admin/centros/:id/edit", component: FormCentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/centros/create", component: FormCentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios", component: FormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios/:id/edit", component: FormFormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios/create", component: FormFormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios/:id/preview", component: FormFormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/empresas", component: EmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/empresas/:id/edit", component: FormEmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/empresas/create", component: FormEmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/usuarios", component: UsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/usuarios/:id/edit", component: FormUsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/usuarios/create", component: FormUsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  

  { path: "**", redirectTo: ""}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
