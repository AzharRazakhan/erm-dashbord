import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
    
  }

  login(username:string,password:string):Observable<User | null> {
    return this.http.get<User | null>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => users || null),
        tap(user => {
           localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', 'mock-jwt-token');
          this.currentUserSubject.next(user)
        })
      )
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null)
  }

  getToken():string| null {
    return localStorage.getItem('token')
  }


  isLoggin():Boolean {
      return !!this.getToken()
  }

}
