import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignformComponent } from './components/signform/signform.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { FormUsuariosComponent } from './components/admin/usuarios/form-usuarios/form-usuarios.component';
import { CentrosComponent } from './components/admin/centros/centros.component';
import { FormCentrosComponent } from './components/admin/centros/form-centros/form-centros.component';
import { ShowCentrosComponent } from './components/admin/centros/show/show.component';
import { FormulariosComponent } from './components/admin/formularios/formularios.component';
import { FormFormulariosComponent } from './components/admin/formularios/form-formularios/form-formularios.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { CentroComponent } from './components/centro/centro.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { ShowEmpresasComponent } from './components/admin/empresas/show/show.component';
import { FormEmpresasComponent } from './components/admin/empresas/form-empresas/form-empresas.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "recovery", component: RecoveryComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  { path: "form/:id/:opcion", component: SignformComponent, canActivate: [AuthGuardService] },
  { path: "perfil", component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: "perfil/edit", component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: "empresas", component: EmpresaComponent, canActivate: [AuthGuardService]},
  { path: "centros", component: CentroComponent, canActivate: [AuthGuardService]},

  //admin
  { path: "admin/usuarios", component: UsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]}},
  { path: "admin/usuarios/create", component: FormUsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]} },
  { path: "admin/usuarios/:id/edit", component: FormUsuariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]} },
  
  { path: "admin/formularios", component: FormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios/create", component: FormFormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/formularios/:id/edit", component: FormFormulariosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/centros", component: CentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]}},
  { path: "admin/centros/create", component: FormCentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]} },
  { path: "admin/centros/:id/edit", component: FormCentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]} },
  { path: "admin/centros/:id/show", component: ShowCentrosComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]} },
  { path: "admin/empresas", component: EmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador"]} },
  { path: "admin/empresas/:id/show", component: ShowEmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]} },
  { path: "admin/empresas/create", component: FormEmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]} },
  { path: "admin/empresas/:id/edit", component: FormEmpresasComponent, canActivate: [AuthGuardService], data: {roles: ["Administrador", "AdministradorCentro"]} },
  { path: "**", redirectTo: "" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
