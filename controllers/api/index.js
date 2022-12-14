const router = require('express').Router();

const questionsRoutes = require('./questionsRoutes');
const resultsRoutes = require('./resultsRoutes');
const usersRoutes = require('./usersRoutes')

router.use('/questions', questionsRoutes);
router.use('/results', resultsRoutes);
router.use('/users', usersRoutes);

module.exports = router;