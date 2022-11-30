const router = require('express').Router();
const Questions = require('../../models/Questions');
const withAuth = require('../../utils/auth')



router.post('/', async (req, res) => {
  try {

    const minValue = await Questions.min("id", {
      where: {
        category: (req.body.categorySelection)
      }
    })

    res.status(200).json(minValue);

  } catch (err) {
    res.status(500).json(err);
  }

});


router.get('/:id', async (req, res) => {

  try {

    const quizData = await Questions.findByPk(req.params.id, {
      attributes: {
        // include: ['question', 'answerOne', 'answerTwo', 'answerThree', 'answerFour', 'correctAnswer'],
        // exclude: ['category', 'createdAt', 'updatedAt']

      }
    })

    const quiz = quizData.get({ plain: true });

    res.render('quiz', {
      ...quiz,
      logged_in: req.session.logged_in,
      // logged_in: true
    })
    // res.status(200).json(quizData);

  } catch (err) {
    res.status(500).json(err);
  }

})

router.post('/questionArray', async (req, res) => {

  try {

    const questionArray = await Questions.findAll({
      where: {
        category: req.body.categoryID
      },
      attributes: ['id']

    })


    res.status(200).json(questionArray);

  } catch (err) {
    res.status(500).json({ message: 'unable to get max value' });
  }

})

module.exports = router;