var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    console.log( req.flash('emailTaken'));

    res.render('signup', { message: req.flash('emailTaken')});
 
}


exports.signin = function(req, res) {
 
    console.log( req.flash('loginMessage'));
  
    res.render('login', {message: req.flash('loginMessage')});
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

	
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}