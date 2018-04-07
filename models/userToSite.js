module.exports = function(sequelize, DataTypes) {
    var MapUserToSite = sequelize.define("MapUserToSite", {

    });
  
    MapUserToSite.associate = function(models) {
      // We're saying that a User should belong to an Company
      // A user can't be created without an Company due to the foreign key constraint
      MapUserToSite.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
      MapUserToSite.belongsTo(models.Site, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return MapUserToSite;
  };