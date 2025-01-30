import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent implements OnInit {
  todos: any[] = []; // Liste des todos 
  newTodo = { title: '', description: '', completed: false }; // nouveau todo a ajouter
  editTodoData = { id: '', title: '', description: '' }; // données du todo en cours 
  isEditing = false; // indique  si on est en mode edition
  userId: string = ''; // ID de l'utilisateur connecté
  displayName: string = ''; // nom d'affichage de l'utilisateur 

  constructor(private todoService: TodoService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') ?? '';
    this.displayName = localStorage.getItem('displayName') ?? 'Utilisateur';
   // verification de l'authentification 
    if (!this.userId) {
      this.authService.logout();
    } else {
      this.fetchTodos();
    }
  }

  // recuperer des todos depuis le service 
  fetchTodos() {
    this.todoService.getTodos(this.userId).subscribe((response: any) => {
      this.todos = Array.isArray(response) ? response : response.todos ?? [];
    });
  }

  addTodo() {
    if (!this.newTodo.title.trim() || !this.newTodo.description.trim()) return;

    const todoData = { ...this.newTodo, userId: this.userId };
    this.todoService.addTodo(todoData).subscribe(() => {
      this.newTodo = { title: '', description: '', completed: false };
      this.fetchTodos();
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.fetchTodos());
  }

  toggleTodoStatus(todo: any) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe(() => this.fetchTodos());
  }

  showEditForm(todo: any) {
    this.editTodoData = { ...todo };
    this.isEditing = true;
  }

  editTodo() {
    this.todoService.updateTodo(this.editTodoData.id, this.editTodoData).subscribe(() => {
      this.isEditing = false;
      this.fetchTodos();
    });
  }

  logout() {
    this.authService.logout();
  }

  filterCompleted() {
    this.todos = this.todos.filter(todo => todo.completed);
  }
  
  filterNotCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  
}