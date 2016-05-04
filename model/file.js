/**
 * @author  Vu Truong
 *
 * create File table
 * 
 */
module.exports = function(sequelize, DataTypes) {
    // FILE TABLE
    var File = sequelize.define('File', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        createdOnDate: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        }
    }, {
        tableName: 'FILE',
        timestamps: false,
        classMethods: {
            associate: function(models) {}
        }
    });
    return File;
};