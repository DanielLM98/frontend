import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CentrosComponent } from './components/admin/centros/centros.component';
import { FormCentrosComponent } from './components/admin/centros/form-centros/form-centros.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "usuarios", component: UsuariosComponent},
  { path: "admin/centros", component: CentrosComponent, canActivate: [AuthGuardService]},
  { path: "admin/centros/create", component: FormCentrosComponent, canActivate: [AuthGuardService]},
  { path: "**", redirectTo: ""}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
