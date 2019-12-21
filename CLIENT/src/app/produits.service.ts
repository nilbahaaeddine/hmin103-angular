import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		"Access-Control-Allow-Methods": "GET,POST",
		"Access-Control-Allow-Headers": "Content-type",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	})
};

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
	private urlBase: string = 'http://localhost:8888/';

	constructor(private http: HttpClient) { }

	//Partie produits :
	getProduits(): Observable<any> {
		return this.http.get(this.urlBase+'produits');
	}

	getProduitsParCategorie(categorie): Observable<any> {
		return this.http.get(this.urlBase+'produits/'+categorie);
	}

	getCategories(): Observable<any> {
		return this.http.get(this.urlBase+'categories');
	}

	//Partie panier :
	getProduitsPanier(): Observable<any> {
		return this.http.get(this.urlBase+'panier');
	}

	ajouterProduitPanier(produit): Observable<any> {
		return this.http.post(this.urlBase+'panier/add', JSON.stringify(produit), httpOptions);
	}

	majPanier(produit): Observable<any> {
		return this.http.post(this.urlBase+'panier/maj', JSON.stringify(produit), httpOptions);
	}

	retirerProduitPanier(produit): Observable<any> {
		return this.http.post(this.urlBase+'panier/remove', JSON.stringify(produit), httpOptions);
	}

	//Partie recherche
	getProduitsParRecherche(code, nom, categorie, marque, prix): Observable<any> {
		return this.http.get(this.urlBase+'recherche/'+code+"/"+nom+"/"+categorie+"/"+marque+"/"+prix);
	}
}
