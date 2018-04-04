module.exports = function (sequelize, DataTypes) {
    var Wh_Prod_Data = sequelize.define("Wh_Prod_Data", {
        pallet_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        qty_per: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            defaultValue: 0
        }
    });
    Wh_Prod_Data.associate = function (models) {
        // We're saying that warehouse specific details should belong to an warehouse
        Wh_Prod_Data.belongsTo(models.Warehouse, {
            foreignKey: {
                allowNull: false
            }
        });
        // Associating Wh_Prod_Data with order

        Wh_Prod_Data.hasMany(models.Order, {

        });
    };
    return Wh_Prod_Data;
};