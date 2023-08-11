import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = "http://localhost:3000/usuarios";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  

  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getAll Users", []))
    );
  }
  create(user: Omit<User, "id">): Observable<User> {
       return this.http.post<User>(`${this.url}/create`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("create User"))
    );
  }

  update(idUser: number,user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/update/${idUser}`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("update User"))
    );
  }

  fetchById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/get/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<User>("getById User"))
    );
  }

  
}
