const router = require('express').Router();
const Questions = require('../models/Questions');



const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/quiz', apiRoutes);



module.exports = router;
