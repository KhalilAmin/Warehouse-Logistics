module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        product: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        order_qty: {
            type: DataTypes.MEDIUMINT,
            allowNull: true,
        },
        issue_qty: {
            type: DataTypes.MEDIUMINT,
            allowNull: true,
        },
    });
    Order.associate = function (models) {
        // We're saying that a order should belong to an outbound
        // A order can't be created without an outbound due to the foreign key constraint
        Order.belongsTo(models.Outbound, {
            foreignKey: {
                allowNull: false
            }
        });
        // We're saying that a order are associated with prodcuts available in that warehouse
        Order.belongsTo(models.Wh_Prod_Data, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Order;
};