const express = require('express');
const router = express.Router();
const classeCtrl = require('../controllers/classe');
const auth = require('../middleware/auth');

router.get('/', auth, classeCtrl.recupererToutesClasse);
router.post('/',auth, classeCtrl.ajouterClasse);
router.get('/:id', auth,classeCtrl.recupererUneClasse);
router.put('/:id', auth, classeCtrl.modifierClasse);
router.delete('/:id', auth, classeCtrl.supprimerClasse);







module.exports = router;