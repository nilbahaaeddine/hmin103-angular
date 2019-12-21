const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
//Méthode alternative : app.use(require("cors"));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
app.listen(8888);

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("SUPERVENTES");

    //Liste des produits :
    app.get("/produits", (req, res) => {
        console.log("/produits");
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
        	});
        } catch(e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Liste des produits par catégories :
    app.get("/produits/:categorie", (req, res) => {
	    let categorie = req.params.categorie;
	    console.log("/produits/" + categorie);
	    try {
	        db.collection("produits").find({type:categorie}).toArray((err, documents) => {
	            res.end(JSON.stringify(documents));
	        });
	    } catch(e) {
	        console.log("Erreur sur /produits/" + categorie + " : " + e);
	        res.end(JSON.stringify([]));
	    }
	});

	//Liste des catégories :
	app.get("/categories", (req, res) => {
	    console.log("/categories");
	    categories = [];
	    try {
	        db.collection("produits").find().toArray((err, documents) => {
	            for(let doc of documents) {
	                if(!categories.includes(doc.type)) {
	                	categories.push(doc.type);
	                }
	            }
	            console.log("Renvoi de" + JSON.stringify(categories));
	            res.end(JSON.stringify(categories));
	        });
	    } catch(e) {
	        console.log("Erreur sur /categories : " + e);
	        res.end(JSON.stringify([]));
	    }
	});

	//Connexion :
	app.post("/utilisateur/connexion", (req, res) => {
	    console.log("/utilisateurs/connexion avec " + JSON.stringify(req.body));
	    try {
	        db.collection("utilisateurs").find(req.body).toArray((err, documents) => {
	            if(documents.length ==1) {
	                res.end(JSON.stringify({"resultat":1, "message":"Authentification réussie"}));
	            }
	            else {
	            	res.end(JSON.stringify({"resultat":0, "message":"Email et/ou pw incorrect"}));
	            }
	        });

	    } catch(e) {
	        res.end(JSON.stringify({"resultat":0, "message":e}));
	    }
	});

	//Ajout des utilisateurs :
	app.post("/utilisateur/inscription", (req, res) => {
		console.log("/utilisateur/inscription avec " + JSON.stringify(req.body));
	    try {
		    db.collection("utilisateurs").insertOne(req.body)
	        res.end(JSON.stringify({"resultat":1, "message":"Inscription réussie"}));
	    } catch(e) {
	        res.end(JSON.stringify({"resultat":0, "message":e}));
	    }
	});

	//Liste des produits dans le panier :
    app.get("/panier", (req, res) => {
        console.log("/panier");
        try {
            db.collection("panier").find().toArray((err, documents) => {
				res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /panier : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Ajouter un produit dans le panier :
	app.post("/panier/add", (req, res) => {
		console.log("/panier/add avec " + JSON.stringify(req.body));
	    try {
		    db.collection("panier").insertOne(req.body)
	        res.end(JSON.stringify({"resultat":1, "message":"AJOUT réussie"}));
	    } catch(e) {
	    }
	});

	//Supprimer un produit dans le panier :
	app.post("/panier/remove", (req, res) => {
		console.log("/panier/remove avec " + JSON.stringify(req.body));
	    try {
		    db.collection("panier").deleteOne(req.body)
	        res.end(JSON.stringify({"resultat":1, "message":"SUPPRESSION réussie"}));
	    } catch(e) {
	    }
	});

	//MAJ du panier :
	app.post("/panier/maj", (req, res) => {
		console.log("/panier/maj avec " + JSON.stringify(req.body));
	    try {
		    db.collection("panier").update(req.body)
	        res.end(JSON.stringify({"resultat":1, "message":"MAJ réussie"}));
	    } catch(e) {
	    }
	});

	app.get("/recherche/:code/:nom/:categorie/:marque/:prix", (req, res) => {
	    let code = req.params.code;
	    let nom = req.params.nom;
	    let categorie = req.params.categorie;
	    let marque = req.params.marque;
	    let prix = req.params.prix;

	    console.log("/recherche/" + code + "/" + nom + "/" + categorie + "/" + marque + "/" + prix);

	    switch(code) {
	    	case "0000" :
	    		try {
			        db.collection("produits").find().toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits : " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "1000" :
	    		try {
			        db.collection("produits").find({nom:nom}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + nom + " : " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0100" :
	    		try {
			        db.collection("produits").find({type:categorie}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + categorie + " : " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0010" :
	    		try {
			        db.collection("produits").find({marque:marque}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + marque + " : " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0001" :
	    		try {
			        db.collection("produits").find({prix:prix}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + prix + " : " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0101" :
	    		try {
			        db.collection("produits").find({type:categorie, prix:prix}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + categorie + "/" + prix + " :  " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0011" :
	    		try {
			        db.collection("produits").find({marque:marque, prix:prix}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + marque + "/" + prix + " :  " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0111" :
	    		try {
			        db.collection("produits").find({type:categorie, marque:marque, prix:prix}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + categorie + "/" + marque + "/" + prix + " :  " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    	case "0110" :
	    		try {
			        db.collection("produits").find({type:categorie, marque:marque}).toArray((err, documents) => {
			            res.end(JSON.stringify(documents));
			        });
			    } catch(e) {
			        console.log("Erreur sur /produits/" + type + "/" + marque + " :  " + e);
			        res.end(JSON.stringify([]));
			    }
	    		break;
	    }
	});
});