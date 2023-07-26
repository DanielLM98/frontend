import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { Formulario } from '../models/Formulario';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {


  private url = "http://localhost:3000/formularios";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  

  fetchAll(): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<Formulario[]>("getAll Formularios", []))
    );
  }
  create(Formulario: Omit<Formulario, "id">): Observable<Formulario> {
       return this.http.post<Formulario>(`${this.url}/create`, Formulario, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Formulario>("create Formulario"))
    );
  }

  update(idFormulario: number,Formulario: Formulario): Observable<Formulario> {
    return this.http.put<Formulario>(`${this.url}/update/${idFormulario}`, Formulario, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Formulario>("update Formulario"))
    );
  }

  fetchById(id: number): Observable<Formulario> {
    return this.http.get<Formulario>(`${this.url}/get/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Formulario>("getById Formulario"))
    );
  }
}
