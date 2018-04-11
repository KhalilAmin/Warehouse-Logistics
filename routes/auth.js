var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {

    app.get('/', authController.signin);
 
 
    // app.get('/signup', authController.signup);
 
 
    app.get('/login', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/login',
            
            failureFlash: true
            
            }
        
    ));
//  app.post('/signup', function(req,res){
//      console.log(firstName);
//  });
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
 
 
    app.get('/logout', authController.logout);
 
 
    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/login',

            failureFlash: true

           }
 
    ));
 
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/login');
 
    }
 
}
 
