import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';


import { Centro } from '../models/Centro';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private url = "http://localhost:3000/centros";
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
}