const express = require('express');
const router = express.Router();
const eleveCtrl = require('../controllers/eleve');
const auth = require('../middleware/auth');


router.get('/', auth, eleveCtrl.recupererTousEleves);
router.post('/', auth, eleveCtrl.ajouterEleve);
router.get('/:id', auth, eleveCtrl.recupererUnEleve);
router.put('/:id', auth, eleveCtrl.modifierEleve);
router.delete('/:id', auth, eleveCtrl.supprimerEleve);







module.exports = router;