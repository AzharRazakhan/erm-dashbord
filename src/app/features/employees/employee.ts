import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
