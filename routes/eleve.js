const express = require('express');
const router = express.Router();
const eleveCtrl = require('../controllers/eleve');

router.get('/', eleveCtrl.recupererTousEleves);
router.post('/', eleveCtrl.ajouterEleve);
router.get('/:id', eleveCtrl.recupererUnEleve);
router.put('/:id', eleveCtrl.modifierEleve);
router.delete('/:id', eleveCtrl.supprimerEleve);







module.exports = router;