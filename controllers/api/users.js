const router = require('express').Router();
const User = require('../../models/User')




router.get('/', async(req,res) => {

    try{
        const getUserData = await User.findAll({});

        res.status(200).json(getUserData);

    } catch(err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
  try {
    console.log('login test message');
    const userData = await User.findOne({ where: { userName: req.body.userName } });
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
        console.log(validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', async(req, res) => {

    try {
      console.log('test for new user post');
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.userId = userData.id;
          req.session.loggedIn = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }

})









module.exports = router;


