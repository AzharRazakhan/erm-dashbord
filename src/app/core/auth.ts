import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<User> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap((user: any) => {
          console.log(user, 'user---')
          console.log(user?.result?.accessToken)
          localStorage.setItem('token', user?.result?.accessToken);
          localStorage.setItem('user', JSON.stringify(user?.user));
          this.currentUserSubject.next(user)
        })
      )
  }

  signup(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/api/auth/signup`, { name, email, password, role });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null)
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    console.log(localStorage.getItem('token'), '----')
    return localStorage.getItem('token')
  }


  isLoggin(): Boolean {
    return !!this.getToken()
  }


  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decode: any = jwtDecode(token)
      return decode.role
    } catch (error) {
      return null;
    }
  }


  isSuperAdmin(): boolean {
    return this.getUserRole() === 'SuperAdmin';
  }

  isHR(): boolean {
    return this.getUserRole() === 'HR';
  }

}
