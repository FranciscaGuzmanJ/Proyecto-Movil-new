import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabButton, IonTabBar, IonIcon } from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs,IonTabButton, IonTabBar, IonIcon]
})
export class TabsComponent  implements OnInit {

  selectedTab: string = 'home';
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        if (currentUrl.includes('/tabs/home')) {
          this.selectedTab = 'home';
        } else if (currentUrl.includes('/tabs/subir-contenido')) {
          this.selectedTab = 'subir-contenido';
        } else if (currentUrl.includes('/tabs/albunes')) {
          this.selectedTab = 'albunes';
        }else if (currentUrl.includes('/tabs/menu')) {
          this.selectedTab = 'menu';
        }
      }
    });
  }
  ngOnInit() {
  }
  navigateTo(tab: string) {
    this.router.navigate([`/tabs/${tab}`]);
  }

}
