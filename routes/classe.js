const express = require('express');
const router = express.Router();
const classeCtrl = require('../controllers/classe');

router.get('/', classeCtrl.recupererToutesClasse);
router.post('/', classeCtrl.ajouterClasse);
router.get('/:id', classeCtrl.recupererUneClasse);
router.put('/:id', classeCtrl.modifierClasse);
router.delete('/:id', classeCtrl.supprimerClasse);







module.exports = router;