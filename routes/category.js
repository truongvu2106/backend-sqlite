/*
 * @author Vu Truong
 * 
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var logger = require('log4js').getLogger('CATEGORIES');
// categoryDAO
var categoryDAO = require('../dao/categoryDAO.js');

// REST
router.get('/:categoryID', getCategory);
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:categoryID', updateCategory);
router.delete('/:categoryID', deleteCategory);

/**
 * [getCategory description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getCategory(req, res) {
    var functionName = "getCategory";
    var id = req.params.categoryID;
    logger.info("START " + functionName + " [id=" + id + "]");
    var id = req.params.categoryID;
    categoryDAO.getCategoryByID(id, function(err, category) {
        if (err) {
            logger.error(err);
            res.status(500);
            res.send();
            logger.info("END " + functionName);
        } else {
            var ret = {
                "category": category
            };
            res.charset = 'utf-8';
            res.status(200);
            res.send(ret);
            logger.info("END " + functionName + "[" + JSON.stringify(ret) + "]");
        }
    });
}
/**
 * [getCategories description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getCategories(req, res) {
    var functionName = "getCategories";
    logger.info("START " + functionName);
    categoryDAO.getAllCategories(function(err, categories) {
        if (err) {
            logger.error(err);
            res.status(500);
            res.send();
        } else {
            var ret = {
                "categories": categories
            };
            res.header("Content-Type", "application/json; charset=utf-8");
            res.send(ret);
            logger.info("END " + functionName + " [" + JSON.stringify(ret) + "]");
        }
    });
}
/**
 * [createCategory description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createCategory(req, res) {
    var functionName = "createCategory";
    logger.info("START " + functionName + " [" + JSON.stringify(req.body) + "]");
    // TODO validate data
    var category = req.body;
    category.createdDate = new Date();
    category.imageUrl = req.files.imageUrl ? req.files.imageUrl.name : "";
    categoryDAO.createCategory(category, function(err, data) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            var ret = {
                "category": data
            };
            res.header("Content-Type", "application/json; charset=utf-8");
            res.send(ret);
            logger.info("END " + functionName + " [" + JSON.stringify(ret) + "]");
        }       
    });
}
/**
 * [updateCategory description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function updateCategory(req, res) {
    var functionName = "updateCategory";
    logger.info("START " + functionName + " [" + JSON.stringify(req.body) + "]");
    // TODO validate data
    var cate = req.body;
    var cateId = req.params.categoryID
    categoryDAO.getCategoryByID(cateId, function(err, category) {
        category.cateName = cate.cateName || category.cateName;
        category.cateContent = cate.cateContent || category.cateContent;
        if (req.files.imageUrl) {
            category.imageUrl = req.files.imageUrl.name || category.imageUrl;
        }
        category.createdDate = new Date();
        logger.info("[" + JSON.stringify(category) + "]");
        categoryDAO.updateCategory(category, function(err, data) {
            if (err) {
                logger.error(err);
                res.send(500);
            } else {
                var ret = {
                    "category": data
                };
                res.header("Content-Type", "application/json; charset=utf-8");
                res.send(ret);
                logger.info("END " + functionName + " [" + JSON.stringify(ret) + "]");
            }       
        });
    });
}
/**
 * [deleteCategory description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function deleteCategory(req, res) {
    var functionName = "deleteCategory";
    logger.info("START " + functionName);
    var id = req.params.categoryID;
    categoryDAO.deleteCategory(id, function(err, affectedRows) {
        if (err) {
            logger.error(err);
            res.send();
            logger.info("END " + functionName);
        } else {
            var ret = {
                "affectedRows": affectedRows
            };
            res.send(ret);
            logger.info("END " + functionName + "[affectedRows=" + affectedRows + "]");
        }       
    });
}

module.exports = router;
