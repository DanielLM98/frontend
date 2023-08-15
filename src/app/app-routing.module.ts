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

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuardService]},
  { path: "login", component: LoginComponent},
  { path: "recovery", component: RecoveryComponent},
  { path: "resetPassword", component: ResetPasswordComponent},

  { path: "form/:id/rellenar", component: SignformComponent, canActivate: [AuthGuardService]},

  //admin
   {path: "admin/usuarios", component: UsuariosComponent, canActivate: [AuthGuardService]},
   {path: "admin/usuarios/create", component: FormUsuariosComponent, canActivate: [AuthGuardService]},
   {path: "admin/usuarios/edit/:id", component: FormUsuariosComponent, canActivate: [AuthGuardService]},

    {path: "admin/centros", component: CentrosComponent, canActivate: [AuthGuardService]},
    {path: "admin/centros/create", component: FormCentrosComponent, canActivate: [AuthGuardService]},
    {path: "admin/centros/:id/edit", component: FormCentrosComponent, canActivate: [AuthGuardService]},
    {path: "admin/centros/:id/show", component: ShowCentrosComponent, canActivate: [AuthGuardService]},
  { path: "**", redirectTo: ""}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
