import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Film } from 'src/app/model/film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {


  private apiServer = 'http://localhost:8080/api/film';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** GET film from the server */
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiServer)
  }

  /** GET film by id. Will 404 if id not found */
  getFilm(id: number): Observable<Film> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Film>(url).pipe(
      tap(_ => console.log(`fetched Film id=${id}`)),
      catchError(this.handleError<Film>(`getFilm id=${id}`))
    );
  }

  /** POST: add a new film to the server */
  addFilm(filmInput: Film): Observable<Film> {
    return this.http.post<Film>(this.apiServer, filmInput, this.httpOptions).pipe(
      tap((newFilm: Film) => console.log(`added film w/ id=${newFilm.id}`)),
      catchError(this.handleError<Film>('addFilm'))
    );
  }

  updateFilm(filmInput: Film) {
    const url = `${this.apiServer}/${filmInput.id}`;
    return this.http.put<Film>(url, filmInput, this.httpOptions).pipe(
      tap((newFilm: Film) => console.log(`updated film w/ id=${newFilm.id}`)),
      catchError(this.handleError<Film>('updateFilm'))
    );
  }

  /** DELETE: delete film from the server */
  deleteFilm(id: number): Observable<boolean> {
    const url = `${this.apiServer}/${id}`;
    return this.http.delete<boolean>(url).pipe(
      tap(_ => console.log(`deleted film w/ id=${id}`)),
      catchError(this.handleError<boolean>('deleteFilm'))
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
