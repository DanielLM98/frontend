import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, catchError } from 'rxjs';
import { Tutorestrabajo } from '../models/Tutorestrabajo';

@Injectable({
  providedIn: 'root'
})
export class TutorestrabajoService {
  private url = "http://localhost:3000/tutorestrabajo";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll():Observable<Tutorestrabajo[]>{
    return this.http.get(this.url, this.httpOptions).pipe(
      this.errorHandlerService.handleError<any>('fetchAll')
    );
  }

 

  fetchById(id: number): Observable<Tutorestrabajo> {
    return this.http.get<Tutorestrabajo>(`${this.url}/${id}/get`).pipe(
      catchError(this.errorHandlerService.handleError<Tutorestrabajo>("getById Formulario"))
    );
  }
 
}