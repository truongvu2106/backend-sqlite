module.exports = function(sequelize, DataTypes) {
    // Account TABLE
    var Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            defaultValue: ""
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        loginStatus: { // status login [0: Not Login, 1: Login]
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        token: {
            type: DataTypes.TEXT,
            allowNlll: true
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: true
        },
        roles: {
            type: DataTypes.ENUM('admin', 'user'), // there are only 2 options: admin, user
            allowNull: true
        }
    }, {
        tableName: 'Account',
        timestamps: false,
        classMethods: {
            associate: function(models) {}
        }
    });
    return Account;
};