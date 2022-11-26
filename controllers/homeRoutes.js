const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/login', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('login');
});

router.get('/sigup', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('signup');
});

module.exports = router;






