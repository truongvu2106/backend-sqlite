/**
 * NPM module
 */
//logger
var logger = require('log4js').getLogger("[Category DAO]");
//database
var db = require('../model/db.js');

/**
 * [getCategoryByID description]
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getCategoryByID(id, callback) {
	db.Category.find({
		where: {
			id: id
		}
	}).success(function (category) {
		return callback(null, category);
	}).error(function (err) {
		logger.error(err);
		return callback(err);
	});
}

/**
 * [getAllCategories description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getAllCategories(callback) {
	db.Category.findAll()
	.success(function (categories) {
		categories = categories ? categories : [];
		return callback(null, categories);
	}).error(function (err) {
		logger.error(err);
		return callback(err);
	});
}

function createCategory(category, callback) {
	logger.info('\"START createCategory\" [category=' + JSON.stringify(category) + ']');
//	var category = category;
	db.sequelize.transaction(function(t) {
		db.Category.create(category, {
			transaction: t
		}).success(function(category) {
			logger.info('\"END createCategory\" [category=' + JSON.stringify(category) + ']');
			t.commit();
			callback(null, category);
		}).error(function(err) {
			logger.error(err);
			t.rollback();
			err.status = statusCode.INTERNAL_SERVER_ERROR;
			callback(err);
		});
	});
}

function updateCategory(category, callback) {
	logger.info('\"START updateCategory\" [category=' + JSON.stringify(category) + ']');
//	var category = category;
	db.sequelize.transaction(function(t) {
		category.save({
			transaction: t
		}).success(function(category) {
			logger.info('\"END updateCategory\" [category=' + JSON.stringify(category) + ']');
			t.commit();
			callback(null, category);
		}).error(function(err) {
			logger.error(err);
			t.rollback();
			err.status = statusCode.INTERNAL_SERVER_ERROR;
			callback(err);
		});
	});
}

/**
 * [deleteArticle description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteCategory(id, callback) {
	db.Category.destroy({
		id: id
	}).success(function (affectedRows) {
		return callback(null, affectedRows);
	}).error(function (err) {
		logger.error(err);
		return callback(err);
	});
}

/**
 * exports modules
 * @type {Object}
 */
module.exports = {
	getCategoryByID: getCategoryByID,
	getAllCategories: getAllCategories,
	deleteCategory: deleteCategory,
	createCategory: createCategory,
	updateCategory: updateCategory
};