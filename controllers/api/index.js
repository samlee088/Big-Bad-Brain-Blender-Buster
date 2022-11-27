const router = require('express').Router();
const Questions = require('../../models/Questions')

const questionsRoutes = require('./questionsRoutes');
const resultsRoutes = require('./resultsRoutes');
const queryRoutes = require('./queryRoutes');
const userRoutes = require('./users')



router.use('/questions', questionsRoutes);
router.use('/results', resultsRoutes);
router.use('/maximum', queryRoutes);
router.use('/users', userRoutes);

module.exports = router;