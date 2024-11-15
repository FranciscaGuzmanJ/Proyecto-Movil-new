import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.getCurrentUser(); // Obtener el usuario actual

    if (currentUser) {
      // Si el usuario está autenticado, permite el acceso
      return true;
    } else {
      // Si el usuario no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
