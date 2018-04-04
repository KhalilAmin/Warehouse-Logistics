module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });

    Company.associate = function (models) {
        // Associating Comapny with Users
        Company.hasMany(models.User, {
            onDelete: "cascade"
        });
        // Associating Comapny with Sites
        Company.hasMany(models.Site, {
            onDelete: "cascade"
        });
        // Associating Comapny with Products they sell
        Company.hasMany(models.MaterialGroup, {
            onDelete: "cascade"
        });
    };

    return Company;
};
