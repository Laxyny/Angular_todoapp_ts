import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [RouterModule, FormsModule],
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  // objet pour stokerles données d'inscription 
  registerData = { email: '', password: '', displayName: '' };
  // objet pour stoker les données de connexion
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  // methode appalée lors de soumission du formulaire d'inscription
  register() {
    this.authService.register(
      this.registerData.email,
      this.registerData.password,
      this.registerData.displayName
    ).subscribe(() => {
      alert('Inscription réussie !');
    });
  }

  // methode appelée lors de la soumission du formulaire de connexion
  login() {
    this.authService.login(
      this.loginData.email,
      this.loginData.password
    );
  }
}
