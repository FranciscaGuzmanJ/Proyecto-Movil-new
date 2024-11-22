import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthlocalService {

  

  constructor(private afAuth: AuthService ) { }

gInicioSesion(token: string): void {
  localStorage.setItem('token', token); // Guarda el token
  }
  
  gUsuarioAutenticado(): boolean {
  const token = localStorage.getItem('token'); 
  return !!token; // Devuelve true si el token existe
    }
  

  async gCerrarSesion(): Promise<void> {
    localStorage.removeItem('token'); // Elimina el token
    return await this.afAuth.logout()
    }

 

  }