const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

const devoirSchema = mongoose.Schema({

    titre : String,
    description : String,
    dateDebut : Date,
    dateEcheance : Date,
    classes : [{ type: Schema.Types.ObjectId, ref: 'Classe'}],
    eleveDevoirs : [{ type: Schema.Types.ObjectId, ref: 'EleveDevoir'}]
})


//devoirSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Devoir', devoirSchema);