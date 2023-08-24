import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { AdminCentro } from '../models/AdminCentro';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmincentroService {

  private url = "http://localhost:3000/admincentros";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  create(adminCentro: Omit<AdminCentro, "id">): Observable<AdminCentro> {
    return this.http.post<AdminCentro>(`${this.url}/create`, adminCentro, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<AdminCentro>("create AdminCentro"))
    );
  }

  fetchAll(): Observable<AdminCentro[]> {
    return this.http.get<AdminCentro[]>(this.url, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<AdminCentro[]>("fetchAll", []))
    );
  }

  fetchById(id: number): Observable<AdminCentro> {
    return this.http.get<AdminCentro>(`${this.url}/${id}/get`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<AdminCentro>("fetchById"))
    );
  }
}
