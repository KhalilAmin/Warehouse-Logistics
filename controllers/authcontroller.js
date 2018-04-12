var db = require("../models");
var exports = module.exports = {}
 
exports.signup = function(req, res) {

 
 
    // console.log( req.flash('emailTaken'));
    var message = req.flash('error')[0];
    res.render('signup', {message: message});
    

}


exports.signin = function(req, res) {

        // console.log( req.flash('loginMessage'));
    var message = req.flash('error')[0];
    db.Company.findAll({}).then(function(companies) {
        console.log("COMPANIES", companies);
        var hbsObject = {
            companies: companies,
            message: message
        }
    res.render('login',hbsObject);
    })
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

	
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}