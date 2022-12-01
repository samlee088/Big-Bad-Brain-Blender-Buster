const withAuth = (req, res, next) => {
    console.log(req.session);
    if (!req.session.loggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;










