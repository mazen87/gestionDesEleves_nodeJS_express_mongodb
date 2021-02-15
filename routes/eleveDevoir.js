const express = require('express');
const router = express.Router();
const eleveDevoirCtrl = require('../controllers/eleveDevoir');
const auth = require('../middleware/auth');


router.get('/', auth, eleveDevoirCtrl.recupererTousElevesDevoirs);
router.post('/', auth, eleveDevoirCtrl.ajouterEleveDevoir);
router.get('/:id', auth, eleveDevoirCtrl.recupererUnEleveDevoir);
router.put('/:id', auth, eleveDevoirCtrl.modifierEleveDevoir);
router.delete('/:id', auth, eleveDevoirCtrl.supprimerEleveDevoir);







module.exports = router;