# MONGO DB / MONGOOSE


# PREPA DE L'ENVIRONNEMENT

dans fichier index.js on met à jour les imports

```
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
```
+
```
// connection mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});
// création de la base de donnée CRMdb
// la Promise et useMongoClient permet de faire le lien avec MongoDB

// setup de bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// fonction use vient de Express.
// nous permet de convertir le json
```

body parser --> outil qui convertie l'information qu'il y a entre le serveur et la base de donnée puisqu'ici c'est json (mongodb) à convertir.

## CREATION D'UN SCHEMA
==> un fichier schéma est là où on détermine et définit le genre de données qu'on doit accepter dans la base de données

créer fichier crmModel.js
```
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Entrer un prénom'
    },
    lasttName: {
        type: String,
        required: 'Entrer un nom'
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    phone: {
        type: Number,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
```

OBS : pour résumer à ce stade nous avons :
1 ==> une instance MONGODB en cours d'exécution
2 ==> MONGOOSE qui s'y connecte
3 ==> une configuration de schéma*


## CREATION D'UN POST
créer fichier crmControllers.js
nous y créerons une fonction pour pouvoir ajouter des items dans notre bases de données.

```
import mongose from 'mongoose';
import {ContactSchema} from '../models/crmModel';

// création d'un objet Contact qui va importer l'objet de mongoose Contact
const Contact = mongoose.model('Contact', ContactSchema); 

// création de la fonction qui  va permettre d'ajouter des items dans la base de données

export const addNewContact = (req, res) => {
    // création d'un variable avec le schema new Contact qui va venir de la requete
    let newContact = new Contact(req.body);
    // sauvegarder dans la base de donnée + si erreur res err, autrement res création contact dans le json
    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
```

ensuite il convient de passer la fonction dans notre crmRoutes.js en l'important
```
import { addNewContact } from '../controllers/crmController';
``` 
+ mise à jour et remplace du POST
```
.post(addNewContact);
```

OBS : test avec postman : POST / localhost:3000/contact
puis dans x-www-form-urlencoded on test le schema firstName lastName avec donnée test et on on fait le test. Permet de test l'app. 

## CREATION D'UN GET
dans le fichier crmControllers.js on crée à nouveau une fonction
```
export const getContacts = (req, res) => {
    // nous allons dans la BDD Contact pour y trouver qqchose donc on fait un Contact.find dans lequel nous passons un objet {}
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
```

puis mise à jour du fichier crmRoutes.js en y passant la fonction getContact dans le .get 
```
        .get((req, res, next) => {
            //middleware
            console.log(`Request de : ${req.originalUrl}`)
            console.log(`Request type : ${req.method}`)
            next();
        }, getContacts)
```
+
ne pas oublier d'importer la fonction getContact. Mise à jour de l'import : 
```
import { runInNewContext } from "vm"; 
import { 
    addNewContact,
    getContacts    
} from '../controllers/crmControllers';
```

OBS : test dans postman du get toujours avec l'url localhost:3000/contact
On obtient dès lors notre liste de contact

## CREER LE GET AVEC ID

nous allons modifier le code de notre controller 
rajout d'une fonction getContactWithID
```
export const getContactWithID = (req, res) => {
    // nous utilisons donc le findById, dans lequel nous devons passer les paramètres qu'on obtient d'url qu'on a entrés. Il s'agit du ID
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
```
nous le passons ensuite dans nos routes.
Faire l'import puis mise à jour de l'app.route('/contact/:contact:Id'))

On ajoute un contact avec ID
```
    app.route('/contact/:contactId')
        // contact avec ID
        .get(getContactWithID)

        // mise à jour contact
        .put((req, res) =>
            res.send('demande PUT avec succès'))

        // supprimer contact
        .delete((req, res) =>
            res.send('demande DELETE avec succès'));
```

OBS : test avec postman. On copie au préalable un ID et on le rajoute dans l'url du GET pour notre recherche :
localhost:3000/contact/5e59168a7f8bff3ec45a72c3

## CREER UN PUT pour mise à jour des données

rajout d'une méthode updateContact dans notre controller. On utilisera du coup findOneAndUpdate, qui prend des paramètres spécifiques
```
export const updateContact = (req, res) => {
    // nous utilisons donc le findById, dans lequel nous devons passer les paramètres qu'on obtient d'url qu'on a entrés. Il s'agit du ID
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};
```
les 3 paramètres sont : 
_id de l'item qu'on doit changer dans la BDD
req.body, qui permet de changer l'information dans la BDD
new: true, qui permet de mettre à jour l'information dans la BDD
puis ensuite le classique message d'erreur

Mise à jour de la route PUT
```
.put(updateContact)
```

OBS : test postman. On choisi au préalable l'ID qu'on souhaite mettre à jour la récupère avec le GET.
On sélectionne le PUT et on modifie par exemple le nom de l'entreprise. On valide le PUT. Normalement OK modif de la BDD OK.

## CREER le pt de terminaison DELETE
dans le controller création de la méthode deleteContact
```
export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Effacer contact avec succès'});
    });
};
```
dans nos routes mise à jour de l'import et du delete
```
.delete(deleteContact)
```

OBS : test avec postman. on cherche une liste de nos contacts. On choisi l'ID à effacer. Puis faire DELETE avec 
```
localhost:3000/contact/5e59166b7f8bff3ec45a72c2
```
+
Verification dans DBCompass OK, il y a bien 2 contact et plus 3.
 

# RESUME
nous avons 1 API complète avec 4 points de terminaisons (GET POST PUT DELETE + GET avec ID)


# FICHIER STATIQUES
avec le serveur express il est possible de servir des fichiers statiques (images, fichiers divers) qu'on souhaite mettre à dispo depuis notre backend. 

Dans le dossier du serveur nous créons un nouveau dossier public dans lequel on met une image : best.jpg 

Nous allons tester si cette image est disponible à partir de notre navigateur : 
http://localhost:3000/best.jpg
ça ne marche pas car il faut ajouter le code dans le serveur pour donner accès au fichier statique. 

Dans fichier index.js on ajoute la méthode use qui permet d'ajouter d'autres fonctions d'express, ici static, dans lequel nous passons le dossier de nos fichiers statiques, ici public. 
```
app.use(express.static('public'));
```

test de :
http://localhost:3000/best.jpg
l'image s'affiche dès lors dans le navigateur et sera disponible pour tous les clients.

# d'autres LIBRAIRIES API
koajs.com  // version plus simple de express plus leger

API préconfigurer complète : 
swagger.io
loopback.io


# CONCLUSION
