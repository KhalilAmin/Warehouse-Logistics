module.exports = function (sequelize, DataTypes) {
    var Outbound = sequelize.define("Outbound", {
        shippedto_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        po_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        ship_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        request_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    });
    Outbound.associate = function (models) {
        // We're saying that a User should belong to an Company
        // A user can't be created without an Company due to the foreign key constraint
        Outbound.belongsTo(models.Warehouse, {
            foreignKey: {
                allowNull: false
            }
        });
        // Associating Outbound with order

        Outbound.hasMany(models.Order, {
        
        });
    };

    return Outbound;
};