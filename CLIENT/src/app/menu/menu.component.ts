import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private user: Observable<string>;

  constructor(private authService: AuthentificationService, private router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.router.navigate(['/accueil']);//Page d'accueil
  }

  deconnexion() {
    this.authService.disconnect();
    this.router.navigate(['/accueil']);
  }
}
