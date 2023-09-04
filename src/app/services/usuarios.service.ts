import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Alumnos } from '../models/Alumnos';
import { Tutoresclase } from '../models/Tutoresclase';
import { Tutorestrabajo } from '../models/Tutorestrabajo';
import { AdminCentro } from '../models/AdminCentro';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = "http://34.242.107.233:3000/usuarios";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  



  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getAll Users", []))
    );
  }
  create(user: Omit<User, "id">): Observable<User> {
       return this.http.post<User>(`${this.url}/create`, user, this.httpOptions).pipe(
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

  fetchByCentro(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/getByCentro/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getById User"))
    );
  }

  fetchByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.url}/get/${email}`).pipe(
      catchError(this.errorHandlerService.handleError<User>("getByEmail User"))
    )}

  createAlumno(idUser:number, idCentro:number): void {
    this.http.post(`${this.url}/${idUser}/alumno/${idCentro}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<any>("createAlumno"))
    ).subscribe();
  }

  getEmpresa(idUser:number): Observable<any> {
    return this.http.get<any>(`${this.url}/${idUser}/empresa`).pipe(
      catchError(this.errorHandlerService.handleError<any>("getEmpresa"))
    );
  }

  getCentro(idUser:number): Observable<any> {
    return this.http.get<any>(`${this.url}/${idUser}/centro`).pipe(
      catchError(this.errorHandlerService.handleError<any>("getCentro"))
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/delete/${id}`).pipe(
      catchError(this.errorHandlerService.handleError<User>("delete User"))
  );}

  obtenerTodosDatosUsuario(id: number): Observable<{user: User; alumno: Alumnos; tutorC:Tutoresclase; tutorT:Tutorestrabajo; adminC:AdminCentro}> {

  return this.http.get<{user: User; alumno: Alumnos; tutorC:Tutoresclase; tutorT:Tutorestrabajo; adminC:AdminCentro}>(`${this.url}/getTodosDatosUsuario/${id}`).pipe(
    catchError(this.errorHandlerService.handleError<{user: User; alumno: Alumnos; tutorC:Tutoresclase; tutorT:Tutorestrabajo; adminC:AdminCentro}>("obtenerTodosDatosUsuario"))
  );
  }


  changePassword(id:number,password: String): Observable<User> {
    return this.http.put(`${this.url}/${id}/changePassword`, password, this.httpOptions).pipe(
      first<any>(),
      catchError(this.errorHandlerService.handleError<User>("changePassword"))
    );
  }

  updatePerfil(id:number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}/updatePerfil`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("updatePerfil"))
    );
  }
}
