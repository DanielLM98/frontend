import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  private url = "http://34.242.107.233:3000/respuestas";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  rellenar(userID:number, formID: number, signForm: string) {
    let test = { "IDUsuario": userID, "IDFormulario": formID, "Respuestas": signForm}
    console.log(test)
    return this.http.post(this.url +`/create/`, test).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<any>("rellenar Formulario"))
    );
  }

  getRespuestas(id: number): Observable<any>{
    return this.http.get(`${this.url}/get/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>("getRespuestas", "")));
  }

  updateRespuestas(id: number, signForm: string): Observable<any>{
    return this.http.put(`${this.url}/update/${id}`, signForm, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>("updateRespuestas", "")));
  }

  getRespuestasbyUser(id: number): Observable<any>{
    return this.http.get(`${this.url}/getbyuser/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>("getRespuestasbyUser", "")));
  }
}
