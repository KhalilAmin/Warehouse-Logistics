module.exports = function (sequelize, DataTypes) {
    var Site = sequelize.define("Site", {
        site_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        line_1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        line_2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
        });

        Site.associate = function (models) {
        // We're saying that a User should belong to an Company
        // A user can't be created without an Company due to the foreign key constraint
        Site.belongsTo(models.Company, {
            foreignKey: {
                allowNull: false
            }
        });
        Site.hasMany(models.Warehouse, {
            onDelete: "cascade"
        });
    };

    return Post;
};