const Devoir = require('../models/devoir');
const Classe = require('../models/classe');
const ctrlClasse = require('../controllers/classe');
const mongoose = require('mongoose');
const devoir = require('../models/devoir');
//const eleve = require('../models/eleve');

exports.ajouterDevoir = (req, res, next) => {
    const devoir = new Devoir({
    titre : req.body.titre,
    description: req.body.description,
    dateDebut : req.body.dateDebut,
    dateEcheance : req.body.dateEcheance,
    classes: req.body.classes
   

  });
  devoir.save()
  .then(
    () => {res.status(201).json({message: 'devoir ajouté !'})
      /*
        if(devoir.classes){
            for(let i = 0 ; i < devoir.classes.length; i++ ){
                Classe.findOne({_id:devoir.classes[i]})
                .then(classe =>{
                    classe.devoirs.push(devoir)
                    Classe.updateOne({_id:classe._id},classe)

                    .then(()=>{
                        res.status(201).json({message: 'devoir ajouté'});
                    })
                    .catch(error =>res.status(400).json({error}));
                })
                .catch(error =>res.status(500).json({error}));
            }
        }
      
        /*
      Classe.findOne({_id:eleve.classe._id})
      .then(classe =>{
        classe.eleves.push(eleve)
        Classe.updateOne({_id:classe._id},classe)
        .then(()=>res.status(201).json({message:'elève ajouté avec succès '}))
        .catch( (error) => {
          res.status(400).json({
            error: error
          });
        })
      })
      //res.status(201).json({
       // message: 'élève ajouté avec succès!'
     // });



     */
  
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.recupererUnDevoir = (req, res, next) => {
  Devoir.findOne({
    _id: req.params.id
  }).then(
    (devoir) => {
      res.status(200).json(devoir);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifierDevoir = (req, res, next) => {
  const devoir = new Devoir({
    _id : req.params.id,
    ...req.body
  })
    Devoir.updateOne({_id:req.params.id},devoir)
    .then(()=> res.status(201).json({message: 'devoir modifié ! '}))
    .catch(error=>res.status(400).json({error}));
  //


};

exports.supprimerDevoir = (req, res, next) => {
  Devoir.deleteOne({_id:req.params.id})
  .then(()=>res.status(200).json({message: 'devoir supprimé'}))
  .catch(error=>res.status(500).json({error}));
};

exports.recupererTousDevoirs = (req, res, next) => {
  Devoir.find().then(
    (devoirs) => {
      res.status(200).json(devoirs);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
