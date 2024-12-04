import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';  // Asegúrate de tener estos importados

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private auth: Auth) { }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.auth.currentUser; // Devuelve el usuario actual
  }


  // Registrar un nuevo usuario
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error during registration:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (userCredential.user) {
        return await userCredential.user.getIdToken(); // Obtiene el token de Firebase
    
    } 
    return null;
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
