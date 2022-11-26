const router = require('express').Router();
const {Guesses, Questions} = require('../../Models');


router.get('/', async(req, res) => {
    try{
    // res.status(200).json({message:'Success with scores api call'})
    
    const resultsData = await Guesses.findAll({
        include: [
            {
                model: Questions,
                // attributes: ['correctAnswer']
            }
        ]
    })

    const results = resultsData.map((result) => 
    result.get({plain:true}))

    console.log(resultsData);

    res.render('results', {
       results
    })

    } catch(err) {
        res.status(500).json(err);
    }
})

router.post('/', async(req, res) =>  {
    
    try{    
        const storeQuestionGuess = await Guesses.create({
            ...req.body
        })

        res.status(200).json('Success with storing question guess');

    } catch (err) {
    res.status(500).json('Unsuccessful with storing guess');
    }
})




module.exports = router;