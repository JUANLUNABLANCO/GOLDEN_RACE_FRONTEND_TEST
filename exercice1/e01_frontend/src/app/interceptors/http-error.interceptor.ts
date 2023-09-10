import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn:'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown> | null> {

    console.log('## THROWING BY HTTP ERROR INTERCEPTOR');

    return next.handle(request).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        // here you could add code that displays the error in some fixed part of the screen. this.errorService.show(errorMessage);
        // console.error(errorMessage);
        // return throwError(() => errorMessage);
        return of(null);
      })
    );
  }
}
