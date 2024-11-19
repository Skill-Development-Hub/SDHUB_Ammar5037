import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  signup(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  signin(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/signin`, user);
  }
}
