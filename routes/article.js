/*
 * @author Vu Truong
 * 
 */
var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('Articles');
var auth = require('../services/auth.js');
var File = require('../services/file');
// articleDAO
var articleDAO = require('../dao/articleDAO.js');

// REST
router.get('/:articleID', getArticle);
router.get('/', getArticles);
router.post('/', auth.ensureAuthenticated(null), createArticle);
router.put('/:articleID', auth.ensureAuthenticated(null), updateArticle);
router.delete('/:articleID', auth.ensureAuthenticated(null), deleteArticle);

/**
 * [getarticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getArticle(req, res) {
    var functionName = 'getArticle';
    var id = req.params.articleID;
    logger.info('START ' + functionName + ' [id=' + id + ']');

    articleDAO.getArticleByID(id, function(err, article) {
        if (err) {
            logger.error(err);
            res.status(500);
            res.send();
            logger.info('END ' + functionName);
        } else {
            res.charset = 'utf-8';
            res.status(200);
            res.send(article);
            logger.info('END ' + functionName + '[' + JSON.stringify(article) + ']');
        }
    });
}

/**
 * [getArticles description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getArticles(req, res) {
    var functionName = 'getArticles';
    logger.info('START ' + functionName);
    articleDAO.getAllArticles(function(err, articles) {
        if (err) {
            logger.error(err);
            res.status(500);
            res.send();
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(articles);
            logger.info('END ' + functionName + ' [' + JSON.stringify(articles) + ']');
        }
    });
}
/**
 * [createArticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createArticle(req, res) {
    var functionName = 'createArticle';
    logger.info('START ' + functionName + ' [' + JSON.stringify(req.body) + ']');
    // TODO validate data
    var article = req.body;
    article.created_date = (new Date()).getTime();

    articleDAO.createArticle(article, function(err, data) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(data);
            logger.info('END ' + functionName + ' [' + JSON.stringify(data) + ']');
        }
    });
}
/**
 * [updateArticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function updateArticle(req, res) {
    var functionName = 'updateArticle';
    logger.info('START ' + functionName + ' [' + JSON.stringify(req.body) + ']');
    // TODO validate data
    var art = req.body;
    var artId = req.params.articleID;
    articleDAO.getArticleByID(artId, function(err, article) {
        article.title = art.title;
        article.content = art.content;
        article.updated_date = (new Date()).getTime();
        article.files = art.files;

        if (art.imageUrl !== '') {
            article.imageUrl = art.imageUrl;
        }

        articleDAO.updateArticle(article, function(err, data) {
            if (err) {
                logger.error(err);
                res.send(500);
            } else {
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(data);
                logger.info('END ' + functionName + ' [' + JSON.stringify(data) + ']');
            }
        });
    });
}

/**
 * [deleteArticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function deleteArticle(req, res) {
    var functionName = 'deleteArticle';
    logger.info('START ' + functionName);
    var id = req.params.articleID;

    articleDAO.getArticleByID(id, function(err, article) {
        var files = [];

        if (article.files) {
            files = article.files.split(',');
        }

        files.forEach(function(file) {
            File.deleteFile(file);
        });
        articleDAO.deleteArticle(id, function(err, affectedRows) {
            if (err) {
                logger.error(err);
                res.send();
                logger.info('END ' + functionName);
            } else {
                var ret = {
                    'affectedRows': affectedRows
                };
                res.send(ret);
                logger.info('END ' + functionName + '[affectedRows=' + affectedRows + ']');
            }
        });
    });
}

module.exports = router;
