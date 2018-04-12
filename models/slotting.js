module.exports = function(sequelize, DataTypes) {
    var Slotting = sequelize.define("Slotting", {
      description_main: DataTypes.STRING,
      frequency: DataTypes.INTEGER,
      percentage_ordered: DataTypes.DECIMAL,
      warehouse_name: DataTypes.STRING
    });
    return Slotting;
  };