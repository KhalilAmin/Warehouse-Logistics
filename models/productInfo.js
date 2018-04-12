module.exports = function (sequelize, DataTypes) {
    var Product_Info = sequelize.define("Product_Info", {
        company_prodID: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description_main: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        unit_desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // created_On: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     validate: {
        //         len: [1]
        //     }
        // },
        weight: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: true,
            defaultValue: null,
        },
        weight_class: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        len: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: true,
            defaultValue: null,
        },
        width: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: true,
            defaultValue: null,
        },
        height: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: true,
            defaultValue: null,
        }
    });
    Product_Info.associate = function (models) {
        // A product Info can't be created without an Material Group due to the foreign key constraint
        // We're saying that Produt Info should belong to an mat
        Product_Info.belongsTo(models.MaterialGroup, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Product_Info;
};
