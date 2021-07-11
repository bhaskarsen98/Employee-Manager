import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { employee } from '../domain/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiServer = "http://localhost:3000";
  dbFile = '/employees/'

  //representation header
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //object for request and respomse headers
  constructor(private httpc: HttpClient) { }

  create(employee): Observable<employee> {
    return this.httpc.post<employee>(this.apiServer + this.dbFile, employee, this.httpOptions)
  }  

  get(): Observable<employee[]> {
    return this.httpc.get<employee[]>(this.apiServer + this.dbFile)
  }

  getById(id): Observable<employee> {
    return this.httpc.get<employee>(this.apiServer + this.dbFile + id)
  }

  update(id, employee): Observable<employee> {
    return this.httpc.put<employee>(this.apiServer + this.dbFile + id, employee, this.httpOptions)
  }

  delete(id: number):Observable<number>{
    return this.httpc.delete<number>(this.apiServer + this.dbFile + id, this.httpOptions)
  }

}


