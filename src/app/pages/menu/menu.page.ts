import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router,  private localService: LocalService) { }

  ngOnInit() {
  }


  logout() {
    this.localService.CerrarSesion();
    this.router.navigate(['/login']);

  }

}

