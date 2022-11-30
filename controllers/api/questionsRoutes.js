const router = require('express').Router();
const Questions = require('../../models/Questions');
const withAuth = require('../../utils/auth')



router.post('/', async (req, res) => {
  try {

    console.log(req.body);


    
    // const minValue = await Questions.min("id", {
    //   where: {
    //     category: (req.body.categorySelection)
    //   }
    // })

    // res.status(200).json(minValue);


    // const minValue = await Questions.min("id", {
    //   where: {
    //     [Op.and] : [
    //       {category: (req.body.categorySelection)},
    //       {difficulty: (req.body.difficultySelection)}

    //     ]
        
    //   }
    // })

    const minValue = await Questions.findAll({
      where : {
        category: (req.body.categorySelection),
        difficulty: (req.body.difficultySelection)
      }
    }
    )


    const minValueResult = minValue.map((result) => result.get({plain:true}));

    console.log(minValueResult);

    res.status(200).json(minValueResult[0].id);

    console.log(req.body.categorySelection);
    console.log(req.body.difficultySelection);
    
    // const questionsSearch = await Questions.findAll({
    //   where: {
    //     [Op.and] : [
    //       {category: 'History'},
    //       {difficulty: 'easy'}
    //     ]
    //   }
    // })

    // res.status(200).json(questionsSearch);

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
      loggedIn: req.session.loggedIn,
      // loggedIn: true
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