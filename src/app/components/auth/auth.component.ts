import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [RouterModule, FormsModule]
})
export class AuthComponent {
  registerData = { email: '', password: '', displayName: '' };
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(
      this.registerData.email,
      this.registerData.password,
      this.registerData.displayName
    ).subscribe(() => {
      alert('Inscription réussie !');
    });
  }

  login() {
    this.authService.login(
      this.loginData.email,
      this.loginData.password
    );
  }
}
