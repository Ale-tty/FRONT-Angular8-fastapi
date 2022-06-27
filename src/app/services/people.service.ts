import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { People } from '../models/people';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private peopleURL = 'http://localhost:8000/people/';
  
  constructor(private httpClient : HttpClient) 
  { 
  } 

  public lista(): Observable<any> {
    return this.httpClient.get<Response<any[]>>(this.peopleURL)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  public detail(id: string): Observable<any> {
    return this.httpClient.get<any>(this.peopleURL + `${id}`)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  public save(people: People): Observable<any> {
    return this.httpClient.post<any>(this.peopleURL, people);
  }

  public update(id: string, people: People): Observable<any> {
    return this.httpClient.put<any>(this.peopleURL + `${id}`, people);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.peopleURL + `${id}`);
  }

  private httpErrorHandler (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
       console.error("A client side error occurs. The error message is " + error.message);
    } else {
       console.error(
          "An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }
 
    return throwError("Error occurred. Pleas try again");
 }
}
