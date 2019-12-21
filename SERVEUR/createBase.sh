mongoimport --db SUPERVENTES --collection utilisateurs --file utilisateurs.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection produits --file produits.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection panier --file panier.json --jsonArray --drop