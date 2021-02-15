const Classe = require('../models/classe');
const Eleve = require('../models/eleve');
const EleveDevoir = require('../models/eleveDevoir');
const Devoir = require('../models/devoir');
const mongoose =require('mongoose');
exports.ajouterEleveDevoir = (req, res, next) => {
  const eleveDevoir = new EleveDevoir({
    _id: new mongoose.Types.ObjectId(),
        ...req.body
  });
  eleveDevoir.save()
  .then(()=>{
    Devoir.findByIdAndUpdate(eleveDevoir.devoir, {$push : {eleveDevoirs : eleveDevoir._id}}, { new: true, useFindAndModify: false })
    .then(()=>{
        Eleve.findByIdAndUpdate(eleveDevoir.eleve, {$push : {eleveDevoirs :eleveDevoir._id }}, { new: true, useFindAndModify: false })
        .then(
            ()=>{
                EleveDevoir.find({eleve: eleveDevoir.eleve})
                .then(elevesDevoirs => {
                   // console.log(elevesDevoirs);
                    if(elevesDevoirs){
                        let sum = 0;
                        let nombreDevoirs = 0;
                        let moyenGeneral =0;
                        for(i=0;i<elevesDevoirs.length;i++){
                                sum += elevesDevoirs[i].note;
                                nombreDevoirs = nombreDevoirs+1;
                        }
                        moyenGeneral = sum / nombreDevoirs;
                        Eleve.findByIdAndUpdate(eleveDevoir.eleve, {$set :{ moyen : moyenGeneral }})
                        .then(()=>res.status(200).json({message : 'eleveDevoir ajouté ! '}))
                        .catch(error=>res.status(400).json({error}));
                    }
                })
                .catch(error=>res.status(500).json({error}));
            })
        .catch(error =>res.status(400).json({error}));
    })
    .catch(error =>res.status(400).json({error}));
})
.catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.recupererUnEleveDevoir = (req, res, next) => {
  EleveDevoir.findOne({
    _id: req.params.id
  }).then(
    (eleveDevoir) => {
      res.status(200).json(eleveDevoir);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifierEleveDevoir = (req, res, next) => {
  const eleveDevoir = new EleveDevoir({
    _id: req.params.id,
    ...req.body
  });

  EleveDevoir.updateOne({_id: eleveDevoir._id}, eleveDevoir)
  .then(
    ()=>{
        EleveDevoir.find({"eleve": eleveDevoir.eleve})
        .then(elevesDevoirs => {
            //console.log(elevesDevoirs);
            if(elevesDevoirs.length != 0){
                let sum = 0;
                let nombreDevoirs = 0;
                let moyenGeneral =0;
                for(let i=0;i<elevesDevoirs.length;i++){
                        sum += elevesDevoirs[i].note;
                        nombreDevoirs = nombreDevoirs+1;
                }
                if(nombreDevoirs !=0){
                moyenGeneral = sum / nombreDevoirs;
                }else{
                    moyenGeneral =0;
                }
                Eleve.findByIdAndUpdate(eleveDevoir.eleve, {$set :{ moyen : moyenGeneral }})
                .then(()=>res.status(200).json({message : 'eleveDevoir modifié ! '}))
                .catch(error=>res.status(400).json({error}));
            }
        })
        .catch(error=>res.status(400).json({error}));
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.supprimerEleveDevoir = (req, res, next) => {
    EleveDevoir.findById({_id:req.params.id})
    .then((eleveDevoir)=>{
        Eleve.findByIdAndUpdate(eleveDevoir.eleve,{$pull : {eleveDevoirs : eleveDevoir._id}}, { new: true, useFindAndModify: false })
        .then(()=>{
            Devoir.findByIdAndUpdate(eleveDevoir.devoir,{$pull : {eleveDevoirs : eleveDevoir._id}}, { new: true, useFindAndModify: false })
            .then(()=>{
                EleveDevoir.deleteOne({_id: req.params.id})
                .then(() => {
                      //res.status(200).json({
                        //message: 'supprimé!'
                        EleveDevoir.find({"eleve": eleveDevoir.eleve})
                .then(elevesDevoirs => {
                   // console.log(elevesDevoirs);
                    if(elevesDevoirs){
                        const sum = 0;
                        const nombreDevoirs = 0;
                        const moyenGeneral =0;
                        for(i=0;i<elevesDevoirs.length;i++){
                                sum += elevesDevoirs[i].moyen;
                                nombreDevoirs = nombreEleves+1;
                        }
                        if(nombreDevoirs != 0){
                        moyenGeneral = sum / nombreDevoirs;
                        }else{
                            moyenGeneral = 0;
                        }
                        Eleve.findByIdAndUpdate(eleveDevoir.eleve, {$set :{ moyen : moyenGeneral }},{ new: true, useFindAndModify: false })
                        .then(()=>res.status(200).json({message : 'eleveDevoir supprimé ! '}))
                        .catch(error=>res.status(400).json({error}));
                    }
                })
                .catch(error=>res.status(500).json({error}));
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
    .catch(error=>res.status(400).json({error}));

};

exports.recupererTousElevesDevoirs = (req, res, next) => {
  EleveDevoir.find().then(
    (elevesDevoirs) => {
      res.status(200).json(elevesDevoirs);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
