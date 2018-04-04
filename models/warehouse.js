module.exports = function (sequelize, DataTypes) {
    var Warehouse = sequelize.define("Warehouse", {
        wh_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        companygiven_ID: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    });
    Warehouse.associate = function (models) {
        // We're saying that a warehouse should belong to an site
        // A warehouse can't be created without an site due to the foreign key constraint
        Warehouse.belongsTo(models.Site, {
            foreignKey: {
                allowNull: false
            }
        });
        //warehouses can have many outbound orders
        Warehouse.hasMany(models.Outbound, {

        });
    };

    return Warehouse;
};