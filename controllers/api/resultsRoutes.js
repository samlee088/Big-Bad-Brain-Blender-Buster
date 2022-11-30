const router = require('express').Router();
const {Guesses, Questions, Users} = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try{
    // res.status(200).json({message:'Success with scores api call'})
    console.log(req.session.user_id);
    
    const resultsData = await Guesses.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Questions,
            },
        ]
    })

    // const sumResults = await Guesses.findAll({
    //     where: {
    //         user_id : req.session.user_id
    //     },

    //     attributes: [[
    //         model.sequelize.fn("sum", model.sequelize.col("correctGuess")), "totalCorrect",
    //     ]]
    // })

    // const sumResults = await Guesses.sum( 'correctGuess', 
    // {
    //     where: {
    //         user_id : req.session.user_id
    //     },
      
    // }
    // )

    const sumResults = await Users.findAll( {
        // where: {
        //     id: req.session.user_id
        // },
        include: [
            Guesses
        ]
    })


    const sumRes = sumResults.map((result) => 
    result.get({plain:true}))

    const resultsArr = sumRes.map((user) => {
        const obj = {id: user.id, userName: user.userName, 

            correctGuesses: user.guesses.reduce((total, guess) => total + guess.correctGuess, 0) , 
            
            totalGuesses: user.guesses.length}

        return obj;
    })



    console.log(sumRes);
    console.log(resultsArr);
    // let totalCorrectlyAnswered = sumResults.map((result) => result.get({plain:true}));

    // console.log(totalCorrectlyAnswered);



    const results = resultsData.map((result) => 
    result.get({plain:true}))

  

    res.render('results', {
        results,
        resultsArr,
        loggedIn:req.session.loggedIn
    })

    } catch(err) {
        res.status(500).json(err);
    }
})

router.post('/', withAuth, async(req, res) =>  {
    
    try{    
  
        const storeQuestionGuess = await Guesses.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(200).json('Success with storing question guess');

    } catch (err) {
    res.status(500).json('Unsuccessful with storing guess');
    }
})

router.delete('/', async(req,res) => {
    
    try{ 
        const clearGuessesTable = await Guesses.destroy({
            // truncate: true
            where:  {
                user_id : req.session.user_id
            }
        });

        res.status(200).json({message:'Success with clearing out guesses table'});

    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router;