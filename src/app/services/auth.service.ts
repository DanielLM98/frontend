import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnInit {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User, "ID">;
  user$ = new Observable<User>();
  private _user: User | null = null; // Usuario logueado
  private role: string = ""; // Rol del usuario logueado


  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isUserLoggedIn$.next(true);
    }
  }

  isAutenticated(): boolean {
    if (this.cookieService.get("token")) {
      let decoded = jwt_decode(this.cookieService.get("token")!) as any;
      if (decoded.exp < Date.now() / 1000) {

        return false
      }
      else {
        return true;
      }
    } else {
      return false;
    }
  }
  getUsuario(): User | null {

    return this._user;
  }
  signup(user: Omit<User, "ID">): Observable<User> {
    user.Estado = "Activo";
    user.TipoUsuario = "Usuario";
    console.log(user)

    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  login(correoElectronico: Pick<User, "CorreoElectronico">, contrasena: Pick<User, "Contrasena">): Observable<{
    token: string; userSession: User; userId: number
  }> {

    return this.http
      .post(`${this.url}/login`, { correoElectronico, contrasena }, this.httpOptions)
      .pipe(
        first<any>(),
        tap((tokenObject: { token: string, userSession: User, userId: number }) => {
          this._user = tokenObject.userSession;
          this._user.ID = tokenObject.userId;
          this.role = this._user.TipoUsuario;
          this.cookieService.set("token", tokenObject.token);
          this.cookieService.set("user", JSON.stringify(this._user));
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          
        }),
        catchError(this.errorHandlerService.handleError<{ token: string, userSession: User, userId: number }>("login"))
      );
  }

  resetPassword(password: String): Observable<User> {
    return this.http.put(`${this.url}/resetPassword`, password, this.httpOptions).pipe(
      first<any>(),
      catchError(this.errorHandlerService.handleError<User>("resetPassword"))
    );
  }

  recoveryPassword(correoElectronico: String): Observable<User> {

    return this.http.post(`${this.url}/recovery`, correoElectronico, this.httpOptions).pipe(
      first<any>(),
      catchError(this.errorHandlerService.handleError<User>("recoveryPassword"))
    );
     
  }
}
