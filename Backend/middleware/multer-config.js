// Importation du multer qui est un package qui
// permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  function removeExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
  }
  /* Gestion des fichiers entrants dans les requêtes HTTP */
const storage = multer.diskStorage({
    // // On appelle le callback
    destination: (req, file, callback) => {
      callback(null, 'images'); // On passe le dossier images qu'on a créé dans le backend
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, removeExtension(name) + Date.now() + '.' + extension);//on passe null pour dire qu'il n'y a pas d'erreur
    }
  });
  module.exports = multer({storage: storage}).single('image');