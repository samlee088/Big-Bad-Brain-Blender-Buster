const router = require('express').Router();
const Questions = require('../../models/Questions')

const questionsRoutes = require('./questionsRoutes');
const resultsRoutes = require('./resultsRoutes');
const queryRoutes = require('./queryRoutes');

router.use('/questions', questionsRoutes);
router.use('/results', resultsRoutes);
router.use('/maximum', queryRoutes);


module.exports = router;