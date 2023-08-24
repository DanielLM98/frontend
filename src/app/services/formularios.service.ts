import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { Formulario } from '../models/Formulario';
import { ErrorHandlerService } from './error-handler.service';
import { FormGroup } from '@angular/forms';

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
  create(Formulario: FormData): Observable<Formulario> {
    return this.http.post<Formulario>(`${this.url}/create`, Formulario).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Formulario>("create Formulario"))
    );
  }
  
 


  



  update(idFormulario: number, Formulario: FormData): Observable<Formulario> {
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

  delete(id: number): Observable<Formulario> {
    return this.http.delete<Formulario>(`${this.url}/delete/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Formulario>("delete Formulario"))
    );
  }

  getFormulariosbyRol(rol: string): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(`${this.url}/getbyrol/${rol}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Formulario[]>("getFormulariosbyRol", []))
    );
  }

  downloadFile(id: number): Observable<any>{
    return this.http.get(`${this.url}/rellenar/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>("downloadFile", "")));
  }


}
