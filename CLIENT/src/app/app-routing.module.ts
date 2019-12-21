import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { PanierComponent } from './panier/panier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { EquipeComponent } from './equipe/equipe.component';
import { RechercheComponent } from './recherche/recherche.component';


const routes: Routes = [
  { path: 'utilisateurs/connexion',
    component: ConnexionComponent
  },
  { path: 'categories',
    component: CategoriesComponent
  },
  { path: 'produits/:categorie',
    component: ProduitsComponent
  },
  {	path: 'produits',
	  component: ProduitsComponent
  },
  { path: 'panier',
    component: PanierComponent
  },
  { path: 'panier/add',
    component: PanierComponent
  },
  { path: 'utilisateurs/inscription',
    component: InscriptionComponent
  },
  { path: 'accueil',
    component: AccueilComponent
  },
  { path: 'equipe',
    component: EquipeComponent
  },
  { path: 'contact',
    component: ContactComponent
  },
  { path: 'recherche/:categorie',
    component: RechercheComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
