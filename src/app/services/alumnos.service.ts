import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Alumnos } from '../models/Alumnos';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private url = "http://34.242.107.233:3000/alumnos";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  //Obtener todos los alumnos
  fetchAll(): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<Alumnos[]>("getAll alumnos", []))
    );
  }

  //Obtener un alumno por id
  fetchById(id: number): Observable<Alumnos> {
    return this.http.get<Alumnos>(`${this.url}/get/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Alumnos>("getById alumno"))
    );
  }

  //Crear un alumno
  create(alumno: Omit<Alumnos, "id">): Observable<Alumnos> {
    return this.http.post<Alumnos>(`${this.url}/create`, alumno, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Alumnos>("create alumno"))
    );
  } 

  //Borrar un alumno
  delete(id: number): Observable<Alumnos> {
    return this.http.delete<Alumnos>(`${this.url}/delete/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<Alumnos>("delete alumno"))
    );
  }

  

  
}
