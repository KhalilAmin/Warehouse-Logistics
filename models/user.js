module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
      validate: {
        isEmail: true
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1],
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 15],
    }
  });

  User.associate = function (models) {
    // We're saying that a User should belong to an Company
    // A user can't be created without an Company due to the foreign key constraint
    User.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false
      }
    });
    User.hasMany(models.MapUserToSite, {
      onDelete: "cascade"
    });
  };

  return User;
};

