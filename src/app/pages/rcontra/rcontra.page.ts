import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rcontra',
  templateUrl: './rcontra.page.html',
  styleUrls: ['./rcontra.page.scss'],
})
export class RcontraPage implements OnInit {
  password: any = {
    correo: ""
  }

  field: string = "";

  constructor(public router: Router, public toastController: ToastController) { }

  ngOnInit() { }

  enviar() {
    const error = this.validateModel(this.password);

    if (!error) {
      // Agrego creación de parámetros
      let navigationExtras: NavigationExtras = {
        state: { password: this.password }
      };
      this.limpiar();
      this.presentToast("top", "Se ha enviado correctamente", 2400);
    } else {
      this.presentToast("top", error);  // Mostrar el mensaje de error específico
    }
  }

  limpiar() {
    for (var [key, value] of Object.entries(this.password)) {
      Object.defineProperty(this.password, key, { value: "" });
    }
  }

  /**
   * validateModel para validar el ingreso de algo en los
   * campos de mi html mediante el modelo password
   */
  validateModel(model: any): string | null {
    for (var [key, value] of Object.entries(model)) {
      if (value == "") {
        return `El campo ${key} es obligatorio.`;
      }

      // Validar correo con expresión regular
      if (key === 'correo') {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value as string)) {
          return "El correo electrónico ingresado no es válido.";
        }
      }
    }

    // Si todo es correcto, retorno null (no hay error)
    return null;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
    });

    await toast.present();
  }
}

