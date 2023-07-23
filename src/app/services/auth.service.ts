import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';


import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnInit{
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User, "id">;

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isUserLoggedIn$.next(true);
    }
  }

  signup(user: Omit<User, "id">): Observable<User> {
    user.estado = "Activo";
    user.tipoUsuario = "Usuario";
    console.log(user)

    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  login(correoElectronico: Pick<User, "correoElectronico">, contrasena: Pick<User, "contrasena">): Observable<{
    token: string; userId: Pick<User, "id">
  }> {

    return this.http
    .post(`${this.url}/login`, { correoElectronico, contrasena }, this.httpOptions)
    .pipe(
      first<any>(),
      tap((tokenObject: { token: string, userId: Pick<User, "id"> }) => { 
        this.userId = tokenObject.userId;
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["/"]);
      }),
      catchError(this.errorHandlerService.handleError<{ token: string, userId: Pick<User, "id"> }>("login"))
    );
  }
}
