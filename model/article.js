/**
 * @author  Vu Truong
 *
 * create Article table
 * 
 */
module.exports = function(sequelize, DataTypes) {
    // ARTICLE TABLE
    var Article = sequelize.define('Article', {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        created_date: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        updated_date: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        edited: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 'false'
        },
        files: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'ARTICLE',
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Article;
};