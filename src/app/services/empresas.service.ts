import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { Empresa } from '../models/Empresa';
import { ErrorHandlerService } from './error-handler.service';
import { Tutorestrabajo } from '../models/Tutorestrabajo';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url = "http://34.242.107.233:3000/empresas";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  

  fetchAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<Empresa[]>("getAll empresas", []))
    );
  }
  create(empresa: Omit<Empresa, "id">): Observable<Empresa> {
       return this.http.post<Empresa>(`${this.url}/create`, empresa, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Empresa>("create empresa"))
    );
  }

  update(idempresa: number,empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.url}/update/${idempresa}`, empresa, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Empresa>("update empresa"))
    );
  }

  fetchById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/get/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Empresa>("getById empresa"))
    );
  }

  delete(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.url}/${id}/delete`).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Empresa>("delete empresa"))
    );
  }

  fetchAlumnosEmpresa(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/alumnos`).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getAlumnosEmpresa"))
    );
  }

  fetchTutoresEmpresa(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${id}/tutores`).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getTutoresEmpresa"))
    );
  }
}
