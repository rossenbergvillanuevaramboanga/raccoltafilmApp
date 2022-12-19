import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

//E' un tipo di service perchè Injectable
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  //Funzione che viene eseguita ad ogni request e response
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.includes('login')) {
      request = request.clone({
        headers: new HttpHeaders({ Authorization: `Bearer ${this.authService.getUserToken()}` })
      });
    }

    return next.handle(request);
  }
}
