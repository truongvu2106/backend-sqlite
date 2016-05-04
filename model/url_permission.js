// Url Permission
module.exports = function(sequelize, DataTypes) {
	// Url Permission TABLE
	var UrlPermission = sequelize.define('UrlPermission', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: ""
		},
		method: { // [POST/GET/PUT/DELETE]
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: ""
		},
		fk_role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		permission: { // [0:DISABLE 1:ENABLE]
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	}, {
		tableName: 'URL_PERMISSION',
		timestamps: false,
		// classMethods: {
			// associate: function(models) {
			// 	UrlPermission.belongsTo(models.Role, {
			// 		foreignKey: 'fk_role_id',
			// 		as: 'role'
			// 	});
			// }
		// }
	});
	return UrlPermission;
};