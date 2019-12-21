import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService } from './authentification.service';
import { ProduitsService } from './produits.service';

import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PanierComponent } from './panier/panier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { EquipeComponent } from './equipe/equipe.component';
import { RechercheComponent } from './recherche/recherche.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    CategoriesComponent,
    MenuComponent,
    ConnexionComponent,
    PanierComponent,
    InscriptionComponent,
    AccueilComponent,
    ContactComponent,
    EquipeComponent,
    RechercheComponent
  ],
  imports: [
  	HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthentificationService, ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
