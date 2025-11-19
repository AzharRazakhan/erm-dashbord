import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = environment.apiUrl + '/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(filters?: any): Observable<Employee[]> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        // Only add if value is not null or undefined
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params = params.set(key, filters[key]);
        }
      });
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Employee[]>(this.apiUrl, { params, headers });
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/${id}`);
  }

  addEmployee(data: Employee): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, data, { headers });
  }

  updateEmployee(id: string, data: Employee): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  deleteEmployee(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  uploadDocument(id: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/documents`, formData)
  }
}
