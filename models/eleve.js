
// définir notre elève model 


        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        const EleveSchema = mongoose.Schema({
            nom:String,
            prenom:String,
            dateNaissance:Date,
            moyen:{type:Number , default:0},
            classe: { type: Schema.Types.ObjectId, ref: 'Classe' },
            eleveDevoirs :  [{ type: Schema.Types.ObjectId, ref: 'EleveDevoir' }]

        })

        module.exports = mongoose.model('Eleve', EleveSchema);