module.exports = function(sequelize, DataTypes) {
    var Slotting = sequelize.define("Slotting", {
      description_main: DataTypes.STRING,
      po_count: DataTypes.INTEGER,
      frequency: DataTypes.INTEGER
    });
    return Slotting;
  };