import { Component } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-subir-contenido',
  templateUrl: './subir-contenido.page.html',
  styleUrls: ['./subir-contenido.page.scss'],
})
export class SubirContenidoPage {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  async subirImagen() {
    try {
      // Tomar una foto o seleccionar una imagen desde la galería
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // Usa DataUrl para subir directamente a Storage
        source: CameraSource.Prompt, // Permite al usuario elegir entre cámara o galería
      });

      if (image && image.dataUrl) {
        const user = this.authService.getCurrentUser();
        if (user) {
          // Nombre de archivo con UID y timestamp
          const fileName = 'imagenes/${user.uid}/${new Date().getTime()}.jpeg';
          const storageRef = this.storage.ref(fileName);

          // Convertir la imagen a Blob y subirla a Firebase Storage
          const response = await fetch(image.dataUrl);
          const blob = await response.blob();
          await storageRef.put(blob);

          // Obtener la URL de descarga de la imagen subida
          const downloadURL = await storageRef.getDownloadURL().toPromise();

          // Crear una referencia al documento del usuario
          const userRef = doc(this.firestore, 'users/${user.uid}');

          // Guardar la URL de la imagen y la referencia del usuario en Firestore
          const imageCollectionRef = collection(this.firestore, 'imagenes');
          await addDoc(imageCollectionRef, {
            url: downloadURL,                  // URL de descarga de la imagen
            uid: userRef,                      // Guardar la referencia al documento del usuario
            fechaCreado: new Date()            // Fecha de creación
          });

          console.log('Imagen subida y datos guardados en Firestore.');
        } else {
          console.error('No se encontró el usuario.');
        }
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  }
}
