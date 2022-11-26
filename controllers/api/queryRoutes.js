const router = require('express').Router();
const Questions = require('../../models/Questions');


router.get('/', async(req, res) => {

    try{
   
      const maxValue = await Questions.max("id", {
        where: {
          category: 'General knowledge'
        }
      }) 
  
    res.status(200).json(maxValue);
  
    } catch(err) {
      res.status(500).json({message: 'unable to get max value'});
    }
  
  })

  module.exports = router;