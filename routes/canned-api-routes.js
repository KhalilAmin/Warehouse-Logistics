var db = require("../models");

module.exports = function(app) {

app.post("/api/queryData", function(req, res) {
    db.sequelize.query( 
      "SELECT description_main, po_count AS frequency, frequency AS percentage_ordered, warehouse_name \
      FROM \
        (SELECT  freq.*, Warehouses.wh_id, Warehouses.name AS warehouse_name, SiteSiteId \
        FROM ( \
          SELECT description_main, WarehouseWhID, po_count, ship_date, po_count/( \
            SELECT COUNT(*) AS po_count FROM Outbounds WHERE ship_date BETWEEN  ? AND ?) AS frequency \
          FROM ( \
            SELECT COUNT(*) AS po_count, filteredOutbounds.WarehouseWhID, filteredOutbounds.po_number, filteredOutbounds.ship_date, Orders.id, Orders.product, Product_Infos.description_main \
            FROM (SELECT * \
                  FROM Outbounds \
                  WHERE ship_date \
                  BETWEEN ? AND ?) \
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
      WHERE site_name = ? \
      ORDER BY frequency DESC"   
    , {replacements: [req.body.dateBegin, req.body.dateEnd,req.body.dateBegin, req.body.dateEnd, req.body.siteName], model: db.Slotting}) .then(function(result) { 
          var columns = Object.keys(result[0].dataValues);
          var data = {
            columns: columns,
            data: result
          };
          console.log(result)
          // console.log("JSON", "COLUMNS", data.columns, "RESULT", data.result);
          res.json(data);
        });
  });
};
