var db = require("../models");

module.exports = function(app) {

  app.post("/api/queryData", function(req, res) {
    db.Site.findAll({
      // where: {
      //   site_name: req.body.siteName
      // }
    }).then(function(result) {
      console.log("Result", result);
      var columns = Object.keys(result[0].dataValues);
      var data = {
        columns: columns,
        data: result
      };

      res.json(data);
    })
  });
};
