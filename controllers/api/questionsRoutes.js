const router = require('express').Router();
const Questions = require('../../models/Questions');
const withAuth = require('../../utils/auth')



/* This questions post method is to grab the lowest value for a category and difficulty setting from the questions database to pass through a starting point for the quiz */
router.post('/', async (req, res) => {
  try {

    const minValue = await Questions.findAll({
      where : {
        category: (req.body.categorySelection),
        difficulty: (req.body.difficultySelection)
      }
    })

    const minValueResult = minValue.map((result) => result.get({plain:true}));

    res.status(200).json(minValueResult[0].id);

  } catch (err) {
    res.status(500).json(err);
  }
});


/* This is the routing to get to specific question for rendering */
router.get('/:id', withAuth, async (req, res) => {
  try {

    const quizData = await Questions.findByPk(req.params.id, {})

    const quiz = quizData.get({ plain: true });

    res.render('quiz', {
      ...quiz,
      loggedIn: req.session.loggedIn,
     
    })

  } catch (err) {
    res.status(500).json(err);
  }
})


/* This post route works to get all id values of questions with the selected category and difficulty that was selected. This array is then passed through to determine the next question to render*/
router.post('/questionArray', async (req, res) => {
  try {

    const questionArray = await Questions.findAll({
  
      where : {
        category: req.body.categoryID,
        difficulty: req.body.difficultySelection
      },
      attributes: ['id']

    })

    res.status(200).json(questionArray);

  } catch (err) {
    res.status(500).json({ message: 'unable to get questions array' });
  }
})

module.exports = router;