import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { NavsuperiorComponent } from './components/navsuperior/navsuperior.component';


import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';

import { AuthGuardService } from './services/auth-guard.service';
import { SignformComponent } from './components/signform/signform.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

//admin
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { FormUsuariosComponent } from './components/admin/usuarios/form-usuarios/form-usuarios.component';
import { CentrosComponent } from './components/admin/centros/centros.component';
import { FormCentrosComponent } from './components/admin/centros/form-centros/form-centros.component';
import { ShowCentrosComponent } from './components/admin/centros/show/show.component';
import { FormulariosComponent } from './components/admin/formularios/formularios.component';
import { FormFormulariosComponent } from './components/admin/formularios/form-formularios/form-formularios.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    NavsuperiorComponent,
    SignformComponent,
    RecoveryComponent,
    ResetPasswordComponent,

    //admin

    UsuariosComponent,
    FormUsuariosComponent,
    CentrosComponent,
    FormCentrosComponent,
    ShowCentrosComponent,
    FormulariosComponent,
    FormFormulariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthService, AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
