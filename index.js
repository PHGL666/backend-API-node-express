import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';


const app = express(); //créer nouvel application
const PORT = 3000; // créer un nouveau serveur avec la libraire express + variable PORT


// connection mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// création de la base de donnée CRMdb
// la Promise et useMongoClient permet de faire le lien avec MongoDB

// setup de bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// fonction use vient de Express.
// nous permet de convertir le json


routes(app); // on passe les routes dans l'app

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.send(`Serveur node et express sur port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Votre serveur est sur le port ${PORT}`)
); // créer méthode listen pour écouter le PORT

