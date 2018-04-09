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

  // app.post("/api/test", function(req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Order.findAll({
  //     order: [["order_qty", "DESC"]],
  //     limit: 100

  //   }).then(function(result) {
  //     console.log(result)
  //     var columns = Object.keys(result[0].dataValues);
  //     var data = {
  //       columns: columns,
  //       data: result
  //     };
  //     console.log("JSON", data.columns);
  //     res.json(data);
    
  //   });
  // });


  // app.post("/api/test", function(req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Order.findAll({
  //     order: [["order_qty", "DESC"]],
  //     include: [db.Product_Info],
  //     limit: 100

  //   }).then(function(result) {
  //     var columns = Object.keys(result[0].dataValues);
  //     var data = {
  //       columns: columns,
  //       data: result
  //     };
  //     console.log("JSON", data.columns);
  //     res.json(data);
    
  //   });
  // });

  app.post("/api/test", function(req, res) {
    db.sequelize.query( 
      "SELECT description_main, po_count AS frequency, frequency AS percentage_ordered, site_name \
        FROM \
          (SELECT  freq.*, Warehouses.wh_id, SiteSiteId \
          FROM ( \
            SELECT description_main, WarehouseWhID, po_count, ship_date, po_count/( \
              SELECT COUNT(*) AS po_count FROM Outbounds WHERE ship_date BETWEEN  ? AND ?) AS frequency \
            FROM ( \
              SELECT COUNT(*) AS po_count, filteredOutbounds.WarehouseWhID, filteredOutbounds.po_number, filteredOutbounds.ship_date, Orders.id, Orders.product, Product_Infos.description_main \
              FROM (SELECT * \
                    FROM Outbounds \
                    WHERE ship_date \
                    BETWEEN  '2016-10-30 00:00:00' AND '2017-10-30 00:00:00') \
                    AS filteredOutbounds \
              INNER JOIN (Orders LEFT JOIN Product_Infos ON Orders.product = Product_Infos.company_prodID) \
              ON filteredOutbounds.id = Orders.OutboundId \
              GROUP BY Orders.product \
              ) AS tbl \
            GROUP BY description_main \
            ORDER BY frequency DESC) AS freq \
          INNER JOIN Warehouses \
          ON freq.WarehouseWhID = Warehouses.wh_id) AS tbl \
        INNER JOIN Sites \
        ON Sites.site_id = tbl.SiteSiteID \
        ORDER BY frequency DESC"
         
    , {replacements: ['2016-10-30 00:00:00','2017-10-30 00:00:00'], model: db.Slotting}) .then(function(result) { 
          var columns = Object.keys(result[0].dataValues);
          //console.log(result);
          var data = {
            columns: columns,
            data: result
          };
          console.log("JSON", "COLUMNS", data.columns, "RESULT", data.result);
          res.json(data);
        
        });
  });


};
