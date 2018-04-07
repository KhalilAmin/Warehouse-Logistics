var db = require("../models");

module.exports = function(app) {
  
  app.get("/canned", function(req, res) {

    db.Site.findAll({}).then(function(sites) {

  // index route loads view.html
  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

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