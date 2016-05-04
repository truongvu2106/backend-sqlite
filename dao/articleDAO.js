/**
 * NPM module
 */
//logger
var logger = require('log4js').getLogger("[Article DAO]");
//database
var db = require('../model/db.js');

/**
 * [getArticleByID description]
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getArticleByID(id, callback) {
    db.Article.find({
        where: {
            id: id
        }
    }).success(function (article) {
        return callback(null, article);
    }).error(function (err) {
        return callback(err);
    });
}

/**
 * [getAllArticles description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getAllArticles(callback) {
    db.Article.findAll({
        attributes: ['id', 'title', 'created_date', 'imageUrl', 'updated_date', 'edited']
    }).success(function(articles) {
        articles = articles || [];
        return callback(null, articles);
    }).error(function (err) {
        return callback(err);
    });
}

function createArticle(article, callback) {
    //  var article = article;
    db.sequelize.transaction(function(t) {
        db.Article.create(article, {
            transaction: t
        }).success(function(article) {
            t.commit();
            callback(null, article);
        }).error(function(err) {
            t.rollback();
            callback(err);
        });
    });
}

function updateArticle(article, callback) {
//  var article = article;
    db.sequelize.transaction(function(t) {
        article.save({
            transaction: t
        }).success(function(article) {
            t.commit();
            callback(null, article);
        }).error(function(err) {
            t.rollback();
            callback(err);
        });
    });
}

/**
 * [deleteArticle description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteArticle(id, callback) {
    db.Article.destroy({
        id: id
    }).success(function(affectedRows) {
        return callback(null, affectedRows);
    }).error(function (err) {
        return callback(err);
    });
}

/**
 * exports modules
 * @type {Object}
 */
module.exports = {
    getArticleByID: getArticleByID,
    getAllArticles: getAllArticles,
    deleteArticle: deleteArticle,
    createArticle: createArticle,
    updateArticle: updateArticle
};