const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClasseSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    nom:String,
    eleves: [{ type: Schema.Types.ObjectId, ref: 'Eleve' }],
  

})

module.exports = mongoose.model('Classe', ClasseSchema);