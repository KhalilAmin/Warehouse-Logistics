module.exports = function (sequelize, DataTypes) {
    var MaterialGroup = sequelize.define("MaterialGroup", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    MaterialGroup.associate = function (models) {
        // We're saying that a User should belong to an Company
        // A user can't be created without an Company due to the foreign key constraint
        MaterialGroup.belongsTo(models.Company, {
            foreignKey: {
                allowNull: false
            }
        });
        // Associating Wh_Prod_Data with order

        MaterialGroup.hasMany(models.Product_Info, {

        });
    };
    return MaterialGroup;
};