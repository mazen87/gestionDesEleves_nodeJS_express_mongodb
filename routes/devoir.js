const express = require('express');
const router = express.Router();
const devoirCtrl = require('../controllers/devoir');
const auth = require('../middleware/auth');


router.get('/', auth, devoirCtrl.recupererTousDevoirs);
router.post('/', auth, devoirCtrl.ajouterDevoir);
router.get('/:id', auth, devoirCtrl.recupererUnDevoir);
router.put('/:id', auth, devoirCtrl.modifierDevoir);
router.delete('/:id', auth, devoirCtrl.supprimerDevoir);







module.exports = router;