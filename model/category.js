/**
 * @author  Vu Truong
 *
 * create Category table
 * 
 */
module.exports = function(sequelize, DataTypes) {
	// Category TABLE
	var Category = sequelize.define('Category', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cateName: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: ''
		},
		createdDate: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: ''
		},
		imageUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: ''
		},
		cateContent: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: ''
		}
	}, {
		// Getter methods
		getterMethods: {
			id: function() {return this.getDataValue('id');},
			cateName: function() {return this.getDataValue('cateName');},
			createdDate: function() {return this.getDataValue('createdDate');},
			imageUrl: function() {return this.getDataValue('imageUrl');},
			cateContent: function() {return this.getDataValue('cateContent');}
		},
		// Setter methods
		setterMethods: {
			id: function(v) { this.setDataValue('id', v);},
			cateName: function(v) { this.setDataValue('cateName', v);},
			createdDate: function(v) { this.setDataValue('createdDate', v);},
			imageUrl: function(v) { this.setDataValue('imageUrl', v);},
			cateContent: function(v) { this.setDataValue('cateContent', v);}
		},
		tableName: 'Category',
		timestamps: false,
		classMethods: {
			associate: function(models) {
				Category.hasOne(models.Article, {
					foreignKey: 'fk_category_id'
				});
			}
		}
	});
	return Category;
};