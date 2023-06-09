// Importatation de package node.js 
/* Lancement du framework Express */
const express = require('express');
// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande, on importe donc body-parser
 // Permet d'extraire l'objet JSON des requêtes POST
 // On utilise une méthode body-parser pour la transformation du corps de la requête en JSON, en objet JS utilisable
const bodyParser = require('body-parser');

const app = express();
// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier 
const path = require('path'); 
// sécuriser notre application de certaines vulnérabilités 
const helmet = require("helmet");
const session = require('cookie-session');
const cors = require("cors");
// 'dotenv' est utilisé afin de masquer les informations de connexion 
//à la base de données à l'aide de variables d'environnement
//require('dotenv').config();



// cela ne fonctione pas const nocache = require('nocache');
// Middleware CORS / Middleware générale 
//Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // ressources partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisatio
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();// passer l'excution au middleware d'apres 
});
const corsOptions = {
  origin: process.env.DOMAIN || "http://localhost:4200",
};
app.use(cors(corsOptions));

const mongoose = require('mongoose');
const exp = require('constants');
/* Connexion à la base de donnée MongoDB */
mongoose.connect('mongodb+srv://Marwa:Marwafrawes123@marwa.ehyvjxd.mongodb.net/marwa?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 

app.use(bodyParser.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
//declaration des routes
const user = require('./routes/user');
const sauce = require('./routes/sauce');
app.use("/api/auth", user);
app.use("/api/sauces", sauce)

// gestion des API ( les principeaux chemins ) / Rendre le dossier "images" statique
app.use('/images', express.static(path.join(__dirname,'images')));


module.exports= app;