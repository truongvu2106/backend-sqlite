/*
 * @author Vu Truong
 * 
 */
var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('Files');
var auth = require('../services/auth.js');
var File = require('../services/file');
// fileDAO
var fileDAO = require('../dao/fileDAO.js');

// REST
router.get('/:fileID', getFile);
router.get('/', getFiles);
router.post('/', auth.ensureAuthenticated(null), createFile);
// router.put('/:fileID', auth.ensureAuthenticated(null), updateFile);
// router.delete('/:fileID', auth.ensureAuthenticated(null), deleteFile);

function getFile(req, res) {
    var functionName = 'getFile';
    var id = req.params.fileID;
    logger.info('START ' + functionName + ' [id=' + id + ']');

    fileDAO.getFileByID(id, function(err, article) {
        if (err) {
            logger.error(err);
            res.status(500);
            res.send();
            logger.info('END ' + functionName);
        } else {
            res.charset = 'utf-8';
            res.send(article);
            logger.info('END ' + functionName + '[' + JSON.stringify(article) + ']');
        }
    });
}

function getFiles(req, res) {
    var functionName = "getFiles";
    logger.info("START " + functionName);
    var type = req.query.type;
    fileDAO.getFilesByType(type, function(err, files) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.send(files);
            logger.info("END " + functionName + " [" + JSON.stringify(files) + "]");
        }
    });
}

function createFile(req, res) {
    var functionName = 'createFile';
    logger.info('START ' + functionName + ' [' + JSON.stringify(req.body) + ']');
    // TODO validate data
    var file = req.body;
    file.createdOnDate = (new Date()).getTime();

    fileDAO.createFile(file, function(err, data) {
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

module.exports = router;
