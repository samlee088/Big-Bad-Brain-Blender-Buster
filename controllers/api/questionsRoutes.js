const router = require('express').Router();
const Questions = require('../../models/Questions');



router.get('/', async (req,res) => {
    try{
        // const quizData = await db.quizzes.findAll({
        //   attributes: [[
        //     sequelize.fn('min', sequelize.col("id"))
            
        //   ]],
        //   raw: true,
        //   where: {
        //     category: 'General Knowledge'
        //   }
        // })
        const minValue = await Questions.min("id", {
          where: {
            category: 'General Knowledge'
          }
        })
  
      //   const maxValue = await Questions.max("id", {
      //     where: {
      //       category: 'General knowledge'
      //     }
      //   }) 
  
      // res.status(200).json(`min value = ${minValue} max value = ${maxValue} blah blah blah`);
      
      res.redirect(`/quiz/questions/${minValue}`)

    } catch (err) {
      res.status(500).json(err);
    }
  
});

router.get('/:id', async (req,res) => {

  try{

  //  const maxValue = await Questions.max("id", {
  //         where: {
  //           category: 'General knowledge'
  //         }
  //       }) 

  //   if(req.params.id == maxValue || !req.params.id) {

  //     document.location.replace('quiz/scores');


  //   }


    const quizData = await Questions.findByPk(req.params.id, {
      attributes: {
        // include: ['question', 'answerOne', 'answerTwo', 'answerThree', 'answerFour', 'correctAnswer'],
        // exclude: ['category', 'createdAt', 'updatedAt']
        
      }
    })

    const quiz = quizData.get({plain:true});

    res.render('quiz', {
      ...quiz,
      // logged_in: req.session.logged_in
    })
    // res.status(200).json(quizData);

  } catch(err) {
    res.status(500).json(err);
  }

})

// router.get('/maximum', async(req, res) => {

//   try{
 
//     // const maxValue = await Questions.max("id", {
//     //   where: {
//     //     category: 'General knowledge'
//     //   }
//     // }) 

//   res.status(200).json({message:"working checkMax"});

//   } catch(err) {
//     res.status(500).json({message: 'unable to get max value'});
//   }

// })



  module.exports = router;