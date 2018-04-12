var db = require("../models");

module.exports = function(app) {
  
  app.get("/canned", function(req, res) {

    //console.log(req.body);
    console.log("ORIG CANNED")
    db.Site.findAll({}).then(function(sites) {
      //console.log("SITES", sites);
      var hbsObject = {
          sites: sites,
      }
  
      res.render("canned", hbsObject);
    }); 
  });
};