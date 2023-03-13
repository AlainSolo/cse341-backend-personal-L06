const express = require('express');
const router = express.Router();

const { loginValidation } = require('../validation.js');

const prophetsController = require('../controllers/prophets');

router.get('/', prophetsController.getAll);
router.get('/:idProphets', prophetsController.getProphets);
router.post('/', loginValidation, prophetsController.create);
router.put('/:username', prophetsController.updateProphets);
router.delete('/:username', prophetsController.deleteProphets);

module.exports = router;
