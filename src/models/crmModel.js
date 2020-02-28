import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Entrer un prénom'
    },
    lastName: {
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
// on export notre class ContactSchema qui crée (new) une nouvelle instance de notre Schema et à l'intérieur on passe ce que l'on a besoin comme schméa (ici firstname etc.)