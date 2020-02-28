# BACKEND

# API REST + NODE / EXPRESS (framework javascript)

## INSTALLATIONS

```
npm init 

npm install --save express

npm i --save mongodb mongoose

```

## CONFIGURER BABEL
permet d'utiliser la syntaxe ES6

```
npm i --save -dev babel-cli babel-preset-env

npm i --save nodemon body-parser
```

créer fichier à la racine du dossier .babelrc
on y rajoute un script 
```
{
    "presets": [
        "env"
    ]
}
```

## CONFIGURATION DU SERVEUR
dans fichier package.json on met à jour les scripts en y rajoutant :
```
"start": "nodemon ./index.js --exec babel-node -e js" 
```

## CREATION FICHIER INDEX.JS

```
import express from 'express';
import routes from './src/routes/crmRoutes';

const app = express(); //créer nouvel application
const PORT = 3000; // créer un nouveau serveur avec la libraire express + variable PORT

routes(app); // on passe les routes dans l'app

app.get('/', (req, res) => 
    res.send(`Serveur node et express sur port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Votre serveur est sur le port ${PORT}`)
); // créer méthode listen pour écouter le PORT

```

nous pouvons lancer l'app
```
npm start
```

nous pouvons test l'app et les points de terminaisons avec POSTMAN

## CREATION DES ROUTES

créer fichier crmRoutes.js
```
const routes = (app) => {
    app.route('/contact')
        .get((req, res) =>
            res.send('demande GET avec succès'))

        .post((req, res) =>
            res.send('demande POST avec succès'));

    app.route('/contact/:contactId')
        .put((req, res) =>
            res.send('demande PUT avec succès'))

        .delete((req, res) =>
            res.send('demande DELETE avec succès'));
}
export default routes;
```

## CREATION DES MIDDLEWARES 
==> fonctions qui ont accès à l'objet de requêtes et de réponse donc requet / response et peuvent executer le code

dans fichiers crmRoutes.js nous ajoutons un objet middelware
```
const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            console.log(`Request de : ${req.originalUrl}`)
            console.log(`Request type : ${req.method}`)
            next();
        }, (req, res, next) => {
            res.send('demande GET avec succès');
        })

        .post((req, res) =>
            res.send('demande POST avec succès'));

    app.route('/contact/:contactId')
        .put((req, res) =>
            res.send('demande PUT avec succès'))

        .delete((req, res) =>
            res.send('demande DELETE avec succès'));
}
export default routes;
```

dans notre terminal on aperçoit nos modifications lorsqu'on appelle notre point de terminaison. 

## FIN

