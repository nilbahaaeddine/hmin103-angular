import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  private user: Observable<string>;
  private items: String[] = new Array();
  private produitToAdd;
  private message: string = "";

  constructor(private router: Router, private authService: AuthentificationService, private produitsService: ProduitsService) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.produitsService.getProduitsPanier().subscribe(categories => {
      var j = 0;
      for (var i = 0; i < categories.length; i++) {
        if(categories[i].email == this.user['_value']) {
          this.items[j] = categories[i];
          j++;
        }
      }
    });
  }

  add(prode) {
    let prod = prode["produits"];
    let mailUtilisateur = this.user['_value'];
    let idProduit = prod.id;
    let quantiteProduit = prod.quantite;
    this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit, "id":idProduit, "nom" : prod.nom, "type" : prod.type, "marque" : prod.marque, "prix":prod.prix, "image":prod.image}};
    this.produitsService.retirerProduitPanier(this.produitToAdd).subscribe(reponse => {
      this.message = reponse['message'];
      if(reponse['resultat']) {
        this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit + 1, "id":idProduit, "nom" : prod.nom, "type" : prod.type, "marque" : prod.marque, "prix":prod.prix, "image":prod.image}};
        this.produitsService.ajouterProduitPanier(this.produitToAdd).subscribe(reponse => {
          this.message = reponse['message'];
          if(reponse['resultat']) {
            this.ngOnInit();
            this.router.navigate(['/panier']);
          }
        });
      }
    });
  }

  remove(prode) {
    let prod = prode["produits"];
    let mailUtilisateur = this.user['_value'];
    console.log(this.user);
    let idProduit = prod.id;
    let quantiteProduit = prod.quantite;
    if(quantiteProduit != 1) {
      this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit, "id":idProduit, "nom" : prod.nom, "type" : prod.type, "marque" : prod.marque, "prix":prod.prix, "image":prod.image}};
      this.produitsService.retirerProduitPanier(this.produitToAdd).subscribe(reponse => {
        this.message = reponse['message'];
        if(reponse['resultat']) {
          this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit - 1, "id":idProduit, "nom" : prod.nom, "type" : prod.type, "marque" : prod.marque, "prix":prod.prix, "image":prod.image}};
          this.produitsService.ajouterProduitPanier(this.produitToAdd).subscribe(reponse => {
            this.message = reponse['message'];
            if(reponse['resultat']) {
              this.ngOnInit();
              this.router.navigate(['/panier']);
            }
          });
        }
      });
    } else if(quantiteProduit < 2) {
      this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit, "id":idProduit, "nom" : prod.nom, "type" : prod.type, "marque" : prod.marque, "prix":prod.prix, "image":prod.image}};
      this.produitsService.retirerProduitPanier(this.produitToAdd).subscribe(reponse => {
        this.message = reponse['message'];
                  console.log(reponse['resultat']);

        if(reponse['resultat']) {
          this.items = [];
          this.ngOnInit();
          this.router.navigate(['/panier']);
        }
      });
      this.ngOnInit();
    }
  }

  prixTot() {
    var totalPrice = 0;
    for (var i = 0; i < this.items.length; i++) {
      totalPrice += this.items[i]["produits"].quantite * this.items[i]["produits"].prix;
    }
    return totalPrice;
  }
}
