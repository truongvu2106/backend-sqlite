module.exports = function(sequelize, DataTypes) {
    // Message TABLE
    var Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        sentOnDate: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "1999-1-1"
        },
        unread: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        replyOnDate: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "1999-1-1"
        },
        replied: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        replyContent: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        }
    }, {
        tableName: 'Message',
        timestamps: false
    });
    return Message;
};