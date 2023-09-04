import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, catchError } from 'rxjs';
import { Tutoresclase } from '../models/Tutoresclase';

@Injectable({
  providedIn: 'root'
})
export class TutoresclaseService {
  private url = "http://34.242.107.233:3000/tutoresclase";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll() {
    return this.http.get(this.url, this.httpOptions).pipe(
      this.errorHandlerService.handleError<any>('fetchAll')
    );
  }

  fetchById(id: number): Observable<Tutoresclase> {
    return this.http.get<Tutoresclase>(`${this.url}/${id}/get`).pipe(
      catchError(this.errorHandlerService.handleError<Tutoresclase>("getById Formulario"))
    );
  }
 
}
