import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Importa Router para la redirección

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  async onLogin() {
    try {
      // Llamamos al método login del servicio de autenticación
      const result = await this.authService.login(this.usuario, this.password);
  
      // Verifica que el login fue exitoso
      console.log('Login exitoso', result);
  
      // Verificar el token guardado
      const token = localStorage.getItem('firebaseToken');
      if (token) {
        console.log('Token guardado:', token);
      } else {
        console.log('No se encontró el token');
      }
  
      // Redirige al usuario a la página de tabs
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Error en el login', error);
      alert('Error en el login. Verifica tus credenciales.');
    }
  }
}