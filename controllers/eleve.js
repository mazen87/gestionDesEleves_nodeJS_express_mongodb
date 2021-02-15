const Eleve = require('../models/eleve');
const Classe = require('../models/classe');
const ctrlClasse = require('../controllers/classe');
const eleve = require('../models/eleve');

exports.ajouterEleve = (req, res, next) => {
  const eleve = new Eleve({
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    moyen: req.body.moyen,
    classe: req.body.classe
    //nom: 'nom_eleve_3',
    //prenom: 'prenom_eleve_3',
    //dateNaissance: '1990-01-01',
    //moyen:66,
    //classe:{_id: '60207310726ef70d0819ad38'}

  });
  eleve.save()
  .then(
    () => {
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
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.recupererUnEleve = (req, res, next) => {
  Eleve.findOne({
    _id: req.params.id
  }).populate('classe').then(
    (eleve) => {
      res.status(200).json(eleve);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifierEleve = (req, res, next) => {

  Eleve.findOne({_id: req.params.id,})
  .then(eleve=>{
    if(eleve.classe._id != req.body.classe ){
         Classe.findOne({_id:eleve.classe._id})
         .then(classe => {
           classe.eleves.splice(classe.eleves.indexOf(eleve._id),1)
           Classe.updateOne({_id:classe._id},classe)
           .then(()=>{
            Classe.findOne({_id:req.body.classe})
            .then(classe =>{
              classe.eleves.push(eleve);
              Classe.updateOne({_id: req.body.classe},classe)
              .then(()=> res.status(201).json({message : 'eleve a été bien mis dans sa bonnes nouvelle classe'}))
              .catch(error=>res.status(500).json({error}));
            })
            .catch(error=>res.status(500).json({error}));
           })
           .catch(error=>res.status(500).json({error}));
         })
         .catch(error=>res.status(400).json({error}))
    }
//

const eleve1 = new Eleve({
   _id: req.params.id,
   nom: req.body.nom,
   prenom: req.body.prenom,
   dateNaissance: req.body.dateNaissance,
   moyen: req.body.moyen,
   classe: req.body.classe
   //_id: '60212734bef02f4ee4a04ee3',
   //nom: 'nom_eleve_3',
   //prenom: 'prenom_eleve_3',
   //dateNaissance: '1990-01-01T00:00:00.000Z',
   //moyen: 66,
   //classe: {_id:'602072ea60fb190428eee938'}
 });
 
 Eleve.updateOne({_id: eleve._id}, eleve1).then(
   () => {
     res.status(201).json({
       message: 'élève modifié avec succès!'
     });
   }
 )
 .catch(
   (error) => {
     res.status(400).json({
       error: error
     });
   }
 );

  })
  .catch(error=>res.status(400).json({error}));
  //


};

exports.supprimerEleve = (req, res, next) => {
  Eleve.findOne({_id: req.params.id})
  .then(eleve =>{
    Classe.findOne({_id:eleve.classe._id})
    .then(classe =>{
      classe.eleves.splice(classe.eleves.indexOf(eleve._id),1);
      Classe.updateOne({_id:classe._id},classe)
      .then(()=>{
        Eleve.deleteOne({_id: req.params.id}).then(
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
      })
      .catch(error=>res.status(400).json({error}));
    })
    .catch(error=>res.status(500).json({error}));
  })
  .catch(error=>res.status(500).json({error}));
};

exports.recupererTousEleves = (req, res, next) => {
  Eleve.find().then(
    (eleves) => {
      res.status(200).json(eleves);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
