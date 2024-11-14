import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, query, where, orderBy, getDocs, doc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    imagenes: any[] = []; // Array para almacenar las URLs de las imágenes
    items: any[] = []; // Array para almacenar las imágenes
    
  
    constructor(private router: Router, 
              private firestore: Firestore, 
              private authService: AuthService,
              public alertController:AlertController,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
                this.getImages();
                //recibo el parametro enviado desde la page Login
                this.activatedRoute.queryParams.subscribe(params =>{
                  if(this.router.getCurrentNavigation()?.extras.state){
            
                    this.router.navigate(['/bienvenido']);
                  }
                });
              }
  getImages() {
    const headers = new HttpHeaders({
      'x-rapidapi-key': '985128acf9msha23e8b38dc632e5p1100a0jsnf83c4c9ba911', // Reemplaza con tu clave API
      'x-rapidapi-host': 'pinterest-image-api1.p.rapidapi.com'
    });

    this.http.get('https://pinterest-image-api1.p.rapidapi.com/images?term=persons', { headers })
      .subscribe(
        (response: any) => {
          this.items = response.images; // Asigna los datos de las imágenes al array
          console.log('Images:', this.items);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  
    async ngOnInit() {
      const navigation = history.state;
      await this.cargarImagenes();
    }
  
    async cargarImagenes() {
      const user = this.authService.getCurrentUser();
      if (user) {
        const userRef = doc(this.firestore, 'users/${user.uid}'); // Referencia al usuario actual
        const imageCollectionRef = collection(this.firestore, 'imagenes');
        const imagenesQuery = query(
          imageCollectionRef,
          where('uid', '==', userRef), // Filtrar por referencia al documento de usuario
          orderBy('fechaCreado', 'desc')
        );
  
        const querySnapshot = await getDocs(imagenesQuery);
        querySnapshot.forEach((doc) => {
          this.imagenes.push(doc.data());
        });
      } else {
        console.error('No se encontró el usuario.');
      }
    }

    async obtenerImagenes() {
      const user = this.authService.getCurrentUser();
      if (user) {
        const imageCollectionRef = collection(this.firestore, 'imagenes');
        const imagenesQuery = query(
          imageCollectionRef,
          where('uid', '==', user.uid), // Filtrar por el uid directamente
          orderBy('fechaCreado', 'desc')
        );
    
        const querySnapshot = await getDocs(imagenesQuery);
        querySnapshot.forEach((doc) => {
          this.imagenes.push(doc.data());
        });
      } else {
        console.error('No se encontró el usuario.');
      }
    }
  
  }



