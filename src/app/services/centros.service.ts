import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';


import { Centro } from '../models/Centro';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private url = "http://localhost:3000/centros";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { }


  create(centro: Omit<Centro, "id">): Observable<Centro> {
   

    return this.http.post<Centro>(`${this.url}/create`, centro, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Centro>("create centro"))
    );
  }
}