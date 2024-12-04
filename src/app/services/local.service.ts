import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private ngFireAuth: AuthService ){ }

  //GUARDAR ELEMENTO EN LOCAL
  saveInLocalStorage(token: string): void {
    localStorage.setItem('token', token); // Guarda el token
  }

  //Para el guard, retorna un token si el usuario esta autenticado
  Autenticado(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token; 
  }

  //Cierra sesión eliminando el token 
  async CerrarSesion(): Promise<void> {
    localStorage.removeItem('token'); // Elimina el token
    return await this.ngFireAuth.logout()
  }


}

