import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3001/api/todos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTodos(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`, this.getHeaders());
  }

  addTodo(todo: any) {
    return this.http.post(this.apiUrl, todo, this.getHeaders());
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  updateTodo(id: string, updatedTodo: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedTodo, this.getHeaders());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }
}
