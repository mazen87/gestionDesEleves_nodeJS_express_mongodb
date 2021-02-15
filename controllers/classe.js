const Classe = require('../models/classe');
const Eleve = require('../models/eleve');
const mongoose =require('mongoose');
exports.ajouterClasse = (req, res, next) => {
  const classe = new Classe({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
  });
  classe.save().then(
    () => {
      res.status(201).json({
        message: 'classe ajouté avec succès!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.recupererUneClasse = (req, res, next) => {
  Classe.findOne({
    _id: req.params.id
  }).populate('eleves').then(
    (classe) => {
      res.status(200).json(classe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifierClasse = (req, res, next) => {
  const classe = new Classe({
    _id: req.params.id,
    nom: req.body.nom,
  });
  console.log(req.body.nom);
  Classe.updateOne({_id: classe._id}, classe).then(
    () => {
      res.status(201).json({
        message: 'classe modifié avec succès!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.supprimerClasse = (req, res, next) => {
  Classe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'supprimé!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.recupererToutesClasse = (req, res, next) => {
  Classe.find().populate('eleves').then(
    (classes) => {
      res.status(200).json(classes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
