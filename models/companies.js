module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });

    Company.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Company.hasMany(models.User, {
            onDelete: "cascade"
        });
        Company.hasMany(models.Site, {
            onDelete: "cascade"
        });
    };

    return Post;
};
