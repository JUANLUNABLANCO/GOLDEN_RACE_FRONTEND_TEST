import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

import { Observable, from, throwError } from 'rxjs';
import { map, tap, catchError }from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userExist(email: string): Observable<boolean> {
    return from(this.http.post<any>('api/users/exist', {email: email}));
  }
  findOne(id: number): Observable<User> {
    return this.http.get('/api/users/' + id).pipe(map((user: User) => user));  // el motivo de este pipe(map()) es para convertir los datos que nos llegan de tipo any a User, directamente el http devuelve un Observable<any>
  }
  updateOne(user): Observable<User> {
    return this.http.put('api/users/' + user.id, user).pipe(map((user: User) => user));
  }
}
