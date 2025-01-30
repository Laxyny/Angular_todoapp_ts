import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string, displayName: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password, displayName });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe((res: any) => {
      localStorage.setItem('userId', res.uid);
      localStorage.setItem('token', res.token);
      localStorage.setItem('displayName', res.displayName);
      this.router.navigate(['/todos']);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
