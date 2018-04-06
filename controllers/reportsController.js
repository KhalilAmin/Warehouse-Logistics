var express = require("express");

var router = express.Router();

var report = require("../models/report.js");

router.get("/", function(req, res) {
    report.selectAll(function(data) {
        console.log(data);
    })
});


// router.get("/", function(req, res) {
//   var hbsObject = {
//     burgers: [],
//     devBurgers: []
//   }


//   burger.selectAll(function(data) {
//     data.forEach(function(burger) {
//       if (burger.devoured === 0) {
//         hbsObject.burgers.push(burger);
//       } else {
//         hbsObject.devBurgers.push(burger);
//       }
//     });
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/addburger", function(req, res) {
//   burger.insertOne("burger_name", "devoured", req.body.name, false, function(result) {
//     res.json({id: result.insertId});
//   });
// });

// router.put("/api/devourburger/:id", function(req, res) {
//   var id = req.params.id;

//   burger.updateOne("devoured", true, "id", id, function(result) {
//     res.json({id: result.insertId});
//   });
// });

module.exports = router;