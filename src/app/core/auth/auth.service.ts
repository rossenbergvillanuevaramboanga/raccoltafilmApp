import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //Differenza tra Observable, Subject and BehaviorSubject

  private apiServer = 'http://localhost:8080/api/auth/login';
  private apiUserInfo = 'http://localhost:8080/api/utente/userInfo';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  login(loginForm: User): Observable<User> {
    // return of({ username: loginForm.username, token: "123456" });
    return this.http.post<{ 'jwt-token': string }>(this.apiServer, loginForm, this.httpOptions).pipe(
      map(
        (res) => { return { username: loginForm.username, token: res['jwt-token'] } }
      ),
      catchError(this.handleError<User>('User'))
    );
  }

  setUserLogged(user: User | null) {
    // this.http.get<string[]>(this.apiUserInfo, this.httpOptions).subscribe(rolesItem => user!.roles = rolesItem);
    this.userLoggedSubject$.next(user);
  }

  getUserLogged(): Observable<User | null> {
    return this.userLoggedSubject$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  isAdmin(): boolean {
    return this.userLoggedSubject$.value?.roles?.includes('ROLE_ADMIN') ? true : false;
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.apiUserInfo, this.httpOptions);
  }

  logout() {
    this.setUserLogged(null);
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
