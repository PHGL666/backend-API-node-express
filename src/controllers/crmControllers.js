import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

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

export const getContacts = (req, res) => {
    // nous allons dans la BDD Contact pour y trouver qqchose donc on fait un Contact.find dans lequel nous passons un objet {}
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const getContactWithID = (req, res) => {
    // nous utilisons donc le findById, dans lequel nous devons passer les paramètres qu'on obtient d'url qu'on a entrés. Il s'agit du ID
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const updateContact = (req, res) => {
    // nous utilisons donc le findById, dans lequel nous devons passer les paramètres qu'on obtient d'url qu'on a entrés. Il s'agit du ID
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Effacer contact avec succès'});
    });
};