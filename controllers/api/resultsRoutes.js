const router = require('express').Router();
const {Guesses, Questions, Users} = require('../../models');
const withAuth = require('../../utils/auth');

/* This is to query all of the results, and selected answers for all users to be rendered onto the results page. */
router.get('/', async(req, res) => {
    try{

        /*Grab all of the data related to rendering the quiz information, ie what the question was, the correct answer, and the selected answer to render  */
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
        
        /*Query the currently logged in user's information to render the results of the quiz. */
        const currentUserResults = await Users.findAll( {
            where: {
                id: req.session.user_id
            },
            include: [
                Guesses
            ]
        })

        const currentUserRes = currentUserResults.map((result) => 
        result.get({plain:true}))

        const currentQuizResultsArr = currentUserRes.map((user) => {
            const obj = {id: user.id, userName: user.userName, 

                correctGuesses: user.guesses.reduce((total, guess) => total + guess.correctGuess, 0) , 
                
                totalGuesses: user.guesses.length}

        return obj;
        })

        /* Query all of the available saved users to render quiz results for all available users and scores */
        const allUsersSumResults = await Users.findAll( {
            include: [
                Guesses
            ]
        })

        const sumRes = allUsersSumResults.map((result) => 
        result.get({plain:true}))

        const resultsArr = sumRes.map((user) => {
            const obj = {id: user.id, userName: user.userName, 

                correctGuesses: user.guesses.reduce((total, guess) => total + guess.correctGuess, 0) , 
                
                totalGuesses: user.guesses.length}

            return obj;
        })

        const results = resultsData.map((result) => 
        result.get({plain:true}))

        
        res.render('results', {
            results,
            resultsArr,
            currentQuizResultsArr,
            loggedIn:req.session.loggedIn
    })

    } catch(err) {
        res.status(500).json(err);
    }
})

/* This is post data regarding the selection that the user made for the quiz */
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

/* This is to clear out the guesses for a individual user only. The guesses can only store 1 quiz at a time */
router.delete('/', async(req,res) => {
    
    try{ 
        const clearGuessesTable = await Guesses.destroy({
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