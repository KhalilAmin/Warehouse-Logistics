var db = require("../models");

module.exports = function(app) {
  
  app.get("/canned", function(req, res) {

    db.Site.findAll({}).then(function(sites) {
      console.log("SITES", sites);
      var hbsObject = {
          sites: sites,
      }
  
      res.render("canned", hbsObject);
    }); 
  });
};

// app.get("/api/sites", function(req, res) {

//   db.Site.findAll({}).then(function(sites) {

//       var hbsObject = {
//           sites: sites,
//           colors: ["red", "yellow", "blue"]
//       }
//       res.send("partials/canned-block", hbsObject);
//   });
// });