import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthlocalService {

  

  constructor(private afAuth: AuthService ) { }

  // Método para iniciar sesión guardando el token en localStorage
gInicioSesion(token: string): void {
  localStorage.setItem('token', token); // Guarda el token
  }
  
  //Método para verificar si el usuario está autenticado
  gUsuarioAutenticado(): boolean {
  const token = localStorage.getItem('token'); // Revisa si existe un token
  return !!token; // Devuelve true si el token existe
    }
  
  //Método para cerrar sesión eliminando el token de localStorage
  async gCerrarSesion(): Promise<void> {
    localStorage.removeItem('token'); // Elimina el token
    return await this.afAuth.logout()
    }

 

  }