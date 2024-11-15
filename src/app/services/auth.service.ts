import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,private auth: Auth) { 
    
  }
  getCurrentUser() {
    return this.auth.currentUser; // Devuelve el usuario actual
  }

  async setAuthPersistence() {
    try {
      // Establecer persistencia Local
      await this.afAuth.setPersistence('session'); // Puede ser 'local', 'session', 'none'
    } catch (error) {
      console.error('Error setting auth persistence:', error);
    }
  }
  
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error during registration:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.setAuthPersistence(); // Asegúrate de configurar la persistencia antes de iniciar sesión
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error during login:', error);
      throw error;
    }
  }


  async logout() {
    try {
      return await this.afAuth.signOut();
    } catch (error) {
      console.log('Error during logout:', error);
      throw error;
    }
  }
  
}
