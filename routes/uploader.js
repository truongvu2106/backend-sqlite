/*
 * @author Vu Truong
 *
 */

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var config = require('../config');
var settings = config.settings();
var File = require('../services/file');
var fileDAO = require('../dao/fileDAO.js');
var logger = require('log4js').getLogger('UPLOAD-FILE');

router.get('/:id', getFileInformation);
router.get('/', getFiles);
router.post('/', uploadFile);
router.delete('/', deleteFiles);

function getFileInformation(req, res) {
    var functionName = "getFileInformation";
    logger.info("START " + functionName);
    logger.info(req);
    res.send(req.files);
    // res.header("Content-Type", "application/json; charset=utf-8");
    // logger.info("END " + functionName + " [" + JSON.stringify(ret) + "]");
}

function getFiles(req, res) {
    var functionName = "getFiles";
    logger.info("START " + functionName);
    fileDAO.getFiles(function(err, files) {
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

function uploadFile(req, res) {
    var functionName = "uploadFile";
    var filesPath = [];
    var form = new multiparty.Form({
        autoFiles: true,
        uploadDir: path.join(__dirname, '../public/images')
    });
    logger.info("START " + functionName);

    // Errors may be emitted 
    // Note that if you are listening to 'part' events, the same error may be 
    // emitted from the `form` and the `part`. 
    form.on('error', function(err) {
        logger.info('Error parsing form: ' + err.stack);
    });
 
    // Parts are emitted when parsing the form 
    form.on('part', function(part) {
        // NOTE: if you want to ignore it, just call "part.resume()" 
        if (part.filename) {
            // filename is defined when this is a file 
            logger.info('Got file named ' + part.name);

            // Saving file
            // File.saveToS3(part, function(err) {
            //     if (err) return res.send(500);
            //     logger.info('Upload completed!');
            // });
        }

        part.on('error', function(err) {
            logger.info('Error parsing part: ' + err.stack);
        });
    });

    form.on('file', function(name, file) {
        var now = Date.now();
        fs.renameSync(file.path, form.uploadDir + '/' + now + '_' + file.originalFilename);
        filesPath.push(settings.hostName + '/images/' + now + '_' + file.originalFilename);
    });

    form.on('close', function() {
        logger.info('Upload completed!');
        res.status(200);
        res.send(filesPath);
    });

    // Parse req
    form.parse(req);
}

function deleteFiles(req, res) {
    var functionName = "deleteFiles";
    logger.info("START " + functionName + '[' + JSON.stringify(req.query) + ']');
    var files = req.query.files;

    if (files) {
        files = files.split(',');
    }

    files.forEach(function(file) {
        File.deleteFile(file);
    });
}

module.exports = router;
