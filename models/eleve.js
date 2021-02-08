//const mongoose = require('mongoose');
// définir notre elève model 
// model.exports nous permet de transmettre ça vers autre fichier een lui appelant 
/*
 module.exports = mongoose.model('Eleve',{
     nom : {type : String},
     prenom : {type : String},
     dateDeNaissance : {type:Date},
     moyen : {type:Number}   
 })
 */
        //import mongoose from 'mongoose';
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        const EleveSchema = mongoose.Schema({
            nom:String,
            prenom:String,
            dateNaissance:Date,
            moyen:Number,
            classe: { type: Schema.Types.ObjectId, ref: 'Classe' }

        })

        module.exports = mongoose.model('Eleve', EleveSchema);