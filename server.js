// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var Chart = require('chart.js');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

// Sets up the Express App
// =============================================================
var app = express();
// var sessionStore = new session.MemoryStore;
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// for cookie-parser
app.use(cookieParser('keyboard cat'));

// For Passport
app.use(session({
  cookie: { maxAge: 60000,
            secure: false },
  // store: sessionStore, 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); 

// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For flash
app.use(flash());

// // Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
// app.use(function(req, res, next){
//   // if there's a flash message in the session request, make it available in the response, then delete it
//   res.locals.sessionFlash = req.session.sessionFlash;
//   delete req.session.sessionFlash;
//   next();
// });



//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
 

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/canned-api-routes.js")(app);
require("./routes/html-routes.js")(app);
var authRoute = require('./routes/auth.js')(app,passport);

//load Passport strategies
 
require('./authentication/config/passport/passport.js')(passport, db.user);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: false}).then(function() {
 
  console.log('Nice! Database looks fine')


}).catch(function(err) {

  console.log(err, "Something went wrong with the Database Update!")

});


app.listen(PORT, function(err) {

  if (!err)

      console.log("Site is live");
       
  else console.log(err)

});
