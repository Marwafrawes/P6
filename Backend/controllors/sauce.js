const Sauce = require('../Models/sauce');
const fs = require('fs');

/* Nous devons afficher toutes les sauces getall : pour afficher tous */
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

/* Afficher une seule sauce avec findOne*/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

/* Créer une sauce */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'BRAVO ! Nouvelle sauce est enregistrée !'}))
        .catch(error => {
            console.log(json({ error }));
            res.status(400).json({ error });
        });
};

/* Modifier une sauce */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };

/* Supprimer une sauce */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

/* Aimer ou ne pas aimer une sauce */
exports.likeOrDislike = (req, res, next) => {
    if(req.body.like === 1){
        Sauce.updateOne({ _id: req.params.id },  {$inc: {likes: req.body.like++} ,$push: {usersLiked: req.body.userId}})
        .then ((sauce)=> res.status(200).json({ message: 'Like ajouté !'}))
        .catch(error => res.status(400).json({ error }));
    } else if (req.body.like === -1){
        Sauce.updateOne({ _id: req.params.id },  {$inc: {dislikes: (req.body.like++)*-1} ,$push: {usersDisliked: req.body.userId}})
        .then ((sauce)=> res.status(200).json({ message: 'Dislike ajouté !'}))
        .catch(error => res.status(400).json({ error }));
    } else{
        
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
                    .then((sauce) => {res.status(200).json({ message: 'Like en moins !'})}) 
                    .catch(error => res.status(400).json({ error }))
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
                    .then((sauce) => {res.status(200).json({ message: 'Dislike en moins !'})}) 
                    .catch(error => res.status(400).json({ error }))  
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};