
// définir notre elève model 


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