const router = require('express').Router();
const Questions = require('../models/Questions');



const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);




module.exports = router;
