import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Regista } from 'src/app/model/regista';


@Injectable({
  providedIn: 'root'
})
export class RegistaService {

  private apiServer = 'http://localhost:8080/api/regista';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** GET registi from the server */
  getRegisti(): Observable<Regista[]> {
    return this.http.get<Regista[]>(this.apiServer)
  }

  /** POST: add a new regista to the server */
  addRegista(registaInput: Regista): Observable<Regista> {
    return this.http.post<Regista>(this.apiServer, registaInput, this.httpOptions).pipe(
      tap((newRegista: Regista) => console.log(`added regista w/ id=${newRegista.id}`)),
      catchError(this.handleError<Regista>('addRegista'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
