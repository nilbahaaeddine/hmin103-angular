import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
	//Panier
	private produitToAdd;
	private message: string = "";
	private itemsPanier: String[] = new Array();

	//Recherche
	private user: Observable<string>;
	private recherche = {"nom":"", "categorie":"", "marque":"", "prix":-1};
	private produits: Object[] = new Array();
	private code="0000";
	constructor(private router: Router, private route: ActivatedRoute, private authService: AuthentificationService, private produitsService: ProduitsService) {
		this.user = this.authService.getUser();
	}

	ngOnInit() {
	}

	creerCode() {
		this.code = "";
		if(this.recherche.nom.localeCompare("") != 0) {
			this.code += "1";
		} else {
			this.code += "0";
		}
		if(this.recherche.categorie.localeCompare("") != 0) {
			this.code += "1";
		} else {
			this.code += "0";
		}
		if(this.recherche.marque.localeCompare("") != 0) {
			this.code += "1";
		} else {
			this.code += "0";
		}
		if(this.recherche.prix != -1) {
			this.code += "1";
		} else {
			this.code += "0";
		}
		console.log("code généré", this.code);
	}

	onSubmit() {
		this.creerCode();


		if(this.recherche.nom.localeCompare("") == 0) {
			this.recherche.nom = "nom";
		}
		if(this.recherche.categorie.localeCompare("") == 0) {
			this.recherche.categorie = "categorie";
		}
		if(this.recherche.marque.localeCompare("") == 0) {
			this.recherche.marque = "marque";
		}
		if(this.recherche.prix == -1) {
			this.recherche.prix = -1;
		}

		this.route.params.subscribe((params :Params) => {
			this.produitsService.getProduitsParRecherche(this.code, this.recherche["nom"],this.recherche["categorie"],this.recherche["marque"],this.recherche["prix"]).subscribe(produits => {
  				this.produits = produits;
			if(this.recherche.nom)
				this.recherche.nom = "";
			if(this.recherche.categorie)
				this.recherche.categorie = "";
			if(this.recherche.marque)
				this.recherche.marque = "";
			if(this.recherche.prix)
				this.recherche.prix = -1;
  			});
	  	});
  	}

  	ajoutBla(produit) {
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
                  this.router.navigate(['/panier']);
                }
              });
            }
          });
      } else {
        this.produitToAdd = {"email":mailUtilisateur, "produits":{"quantite":1, "id":idProduit, "nom" : produit.nom, "type" : produit.type, "marque" : produit.marque, "prix":produit.prix, "image":produit.image}};
        this.produitsService.ajouterProduitPanier(this.produitToAdd).subscribe(reponse => {
          this.message = reponse['message'];
          if(reponse['resultat']) {
            this.router.navigate(['/panier']);
          }
          setTimeout( () => { this.router.navigate(['/panier']); }, 1000 );
        });
      }
    });
  }
}
