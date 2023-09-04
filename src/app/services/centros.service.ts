import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';


import { Centro } from '../models/Centro';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private url = "http://34.242.107.233:3000/centros";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  

  fetchAll(): Observable<Centro[]> {
    return this.http.get<Centro[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<Centro[]>("getAll centros", []))
    );
  }
  create(centro: Omit<Centro, "id">): Observable<Centro> {
       return this.http.post<Centro>(`${this.url}/create`, centro, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Centro>("create centro"))
    );
  }

  update(idcentro: number,centro: Centro): Observable<Centro> {
    return this.http.put<Centro>(`${this.url}/update/${idcentro}`, centro, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Centro>("update centro"))
    );
  }

  fetchById(id: number): Observable<Centro> {
    return this.http.get<Centro>(`${this.url}/get/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Centro>("getById centro"))
    );
  }

  delete(id: number): Observable<Centro> {
    return this.http.delete<Centro>(`${this.url}/delete/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Centro>("delete centro"))
    );
  }

  obtenerAlumnos(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/alumnos`).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getAlumnos centro", []))
    );
  }

  fetchTutoresCentro(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/tutores`).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getTutores centro", []))
    );
  }

  fetchEmpresasCentro(id: number): Observable<Empresa[]> {
  
    return this.http.get<Empresa[]>(`${this.url}/${id}/empresas`).pipe(
      catchError(this.errorHandlerService.handleError<Empresa[]>("getEmpresas centro", []))
    );
  }


}