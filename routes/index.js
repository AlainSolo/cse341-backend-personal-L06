const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/prophets', require('./prophets'));


module.exports = router;
