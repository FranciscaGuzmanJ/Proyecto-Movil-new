import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router'; // Importa Router para la redirección
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm!: FormGroup;

  @ViewChild('imgLogin', { read: ElementRef, static: true })
  imgLogin!: ElementRef;

  constructor(private authService: AuthService,
    private localService : LocalService,
    public loadingCtrl: LoadingController, 
    public formBuilder: FormBuilder,
    private toastController: ToastController,  private router: Router){} // Inyecta Router



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: "",
      password: ""
    })
  }

  get errorControl(){
    return this.loginForm.controls;
  }

  async onLogin() {
    if(!this.validaCorreoLogin(this.loginForm.value.usuario)) {
      this.presentToast("top", "Correo no válido");
    } else if (!this.validaContrasena(this.loginForm.value.password)) {
      this.presentToast("top", "La contraseña no coincide");
    } else {
      const loading = await this.loadingCtrl.create({ duration: 3000 });
      await loading.present();
  
      const token = await this.authService.login(this.loginForm.value.usuario, this.loginForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss();
        return null;
      });
  
      if (token) {
        console.log(token);
        this.localService.saveInLocalStorage(token); // Guarda el token en AuthlocalService
        this.router.navigate(['/tabs']);
      } else {
        console.log('Ingrese datos correctos');
        this.presentToast("top", "Correo o contraseña no válida");
        loading.dismiss();
      }
    }
  }

   //Función del Toast 
   async presentToast(position: 'top' | 'middle' | 'bottom', mensajeToast: string) {
    const toast = await this.toastController.create({
      message: mensajeToast,
      duration: 3000,
      position: position,
    });

    await toast.present();
  }


  validaCorreoLogin(usuario: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expresión regular para validar correo
    return patron.test(usuario);
  
  }

  // Validación que la contraseña tenga una extensión de 6 caracteres. 
  validaContrasena(password: string): boolean {
    return password.length >= 6;
  }

}  