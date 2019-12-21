import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  //Produits
	private user: Observable<string>;
	private produits: Object[] = new Array();

  //Panier
  private produitToAdd;
  private message: string = "";
  private itemsPanier: String[] = new Array();

  //Recherche
  show: boolean = false;

  //Message
  private res = "Produit ajouté !";

	constructor(private router: Router, private route: ActivatedRoute, private authService: AuthentificationService, private produitsService: ProduitsService) {
		this.user = this.authService.getUser();
	}

  onSubmit(produit) {
    console.log(produit.id)
    var idProduit = produit.id;
    var mailUtilisateur = this.user['_value'];
    let quantiteProduit;
    //recuperer tous les produits
    this.produitsService.getProduitsPanier().subscribe(categories => {
      var j = 0;
      for (var i = 0; i < categories.length; i++) {
        if(categories[i].email == this.user['_value']) {
          this.itemsPanier[j] = categories[i];
          j++;
        }
      }

      //parcourir les produits du panier pour voir si le produit à ajouter existe
      for (var i = 0; i < this.itemsPanier.length; i++) {
        console.log("hahahaha", this.itemsPanier[i]["produits"].id);
        if(idProduit == this.itemsPanier[i]["produits"].id) {
          quantiteProduit = parseInt(this.itemsPanier[i]["produits"].quantite);
        }
      }
      
      //Produit existe dans le panier
      if(quantiteProduit != undefined) {
          this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit, "id":idProduit, "nom" : produit.nom, "type" : produit.type, "marque" : produit.marque, "prix":produit.prix, "image":produit.image}};
          this.produitsService.retirerProduitPanier(this.produitToAdd).subscribe(reponse => {
            this.message = reponse['message'];
            if(reponse['resultat']) {
              this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":quantiteProduit + 1, "id":idProduit, "nom" : produit.nom, "type" : produit.type, "marque" : produit.marque, "prix":produit.prix, "image":produit.image}};
              this.produitsService.ajouterProduitPanier(this.produitToAdd).subscribe(reponse => {
                this.message = reponse['message'];
                if(reponse['resultat']) {
                  alert(this.res);
                }
              });
            }
          });
      } else {
        this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":1, "id":idProduit, "nom" : produit.nom, "type" : produit.type, "marque" : produit.marque, "prix":produit.prix, "image":produit.image}};
        this.produitsService.ajouterProduitPanier(this.produitToAdd).subscribe(reponse => {
          this.message = reponse['message'];
          if(reponse['resultat']) {
            alert(this.res);
          }
        });
      }
    });
  }

  ngOnInit() {
  	this.route.params.subscribe((params :Params) => {
  		if(params["categorie"] !== undefined) {
  			this.produitsService.getProduitsParCategorie(params["categorie"]).subscribe(produits => {
  				this.produits = produits;
  			});
  		}
  		else {
  			this.produitsService.getProduits().subscribe(produits => {
  				this.produits = produits;
  			});
  		}
  	});
  }

  afficherRecherche() {
    this.show = true;
  }

  cacherRecherche() {
    this.show = false;
  }
}
