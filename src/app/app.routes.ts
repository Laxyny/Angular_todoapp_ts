import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }