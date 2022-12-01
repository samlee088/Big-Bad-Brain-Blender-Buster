const router = require('express').Router();
const withAuth = require('./../utils/auth');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('login');
});

router.get('/homepage', withAuth, async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  console.log(req.session)
  res.render('homepage', {
    loggedIn:req.session.loggedIn
  });
});

router.get('/signup', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('signup');
});
module.exports = router;






