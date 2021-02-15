const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EleveDevoirSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    note: {type: Number, default : 0},
    remis: {type:Boolean, default:false},
    eleve: { type: Schema.Types.ObjectId, ref: 'Eleve' },
    devoir: { type: Schema.Types.ObjectId, ref: 'Devoir' },
  

})

module.exports = mongoose.model('EleveDevoir', EleveDevoirSchema);