import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  private utilisateur = {"email":"", "password":"", "firstName":"", "lastName":"", "tel":""};//TODO
  private message: string = "";

  constructor(private authService: AuthentificationService, private router: Router) { }

  onSubmit() {
    this.authService.inscriptionUtilisateur(this.utilisateur).subscribe(reponse => {
      this.message = reponse['message'];
      if(reponse['resultat']) {
        this.authService.connect(this.utilisateur.email);
        this.router.navigate(['/accueil']);
      }
    });
  }

  ngOnInit() {
  }
}
