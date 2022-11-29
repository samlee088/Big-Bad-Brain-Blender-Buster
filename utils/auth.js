const withAuth = (req, res, next) => {
    console.log(req.session);
    if(!req.session.loggedIn) {
        res.redirect('/login');
        // console.log("error");
    } else {
        next();
    }
};

module.exports = withAuth;










