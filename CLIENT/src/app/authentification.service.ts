import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

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
export class AuthentificationService {
	private user:Subject<string> = new BehaviorSubject<string>(undefined);
	private baseURL: string = "http://localhost:8888/";

    getUser() {
        return this.user;
    }

	constructor(private http: HttpClient) { }

	connect(data: string) { this.user.next(data); }

	disconnect()  {
		this.user.next(null);
        //this.router.navigate(['/']); // On redirige l'user sur la page d'accueil'
    }

	verificationConnexion(identifiants): Observable<any> {
		return this.http.post(this.baseURL+'utilisateur/connexion', JSON.stringify(identifiants), httpOptions);
	}

    inscriptionUtilisateur(identifiants): Observable<any> {
        return this.http.post(this.baseURL+'utilisateur/inscription', JSON.stringify(identifiants), httpOptions);
    }
}
