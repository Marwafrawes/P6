const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

/* Création d'un schéma de données pour les sauces */
const sauceSchema = mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    manufacturer: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    mainPepper: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    heat: { 
        type: Number, 
        required: true 
    },
    likes: { 
        type: Number, 
        required: true 
    },
    dislikes: { 
        type: Number, 
        required: true 
    },
    usersLiked: { 
        type: Array, 
        required: true 
    },
    usersDisliked: { 
        type: Array, 
        required: true
     }
});

// Utilise le HTML Sanitizer de Google Caja pour effectuer la désinfection.
sauceSchema.plugin(sanitizerPlugin);
module.exports = mongoose.model('Sauce', sauceSchema);