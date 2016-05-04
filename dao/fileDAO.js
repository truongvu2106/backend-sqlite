//database
var db = require('../model/db.js');

function getFileByID(id, callback) {
    db.File.find({
        where: {
            id: id
        }
    }).success(function(file) {
        return callback(null, file);
    }).error(function(err) {
        return callback(err);
    });
}

function getFilesByType(type, callback) {
    db.File.find({
        where: {
            type: type
        }
    }).success(function(files) {
        files = files || [];
        return callback(null, files);
    }).error(function(err) {
        return callback(err);
    });
}

function getAllFiles(callback) {
    db.File.findAll().success(function(files) {
        files = files || [];
        return callback(null, files);
    }).error(function(err) {
        return callback(err);
    });
}

function createFile(file, callback) {
    db.sequelize.transaction(function(t) {
        db.File.create(file, {
            transaction: t
        }).success(function(file) {
            t.commit();
            callback(null, file);
        }).error(function(err) {
            t.rollback();
            err.status = 500;
            callback(err);
        });
    });
}

function updateFile(file, callback) {
    db.sequelize.transaction(function(t) {
        file.save({
            transaction: t
        }).success(function(file) {
            t.commit();
            callback(null, file);
        }).error(function(err) {
            t.rollback();
            err.status = 500;
            callback(err);
        });
    });
}

function deleteFile(id, callback) {
    db.File.destroy({
        id: id
    }).success(function(affectedRows) {
        return callback(null, affectedRows);
    }).error(function(err) {
        return callback(err);
    });
}

/**
 * exports modules
 * @type {Object}
 */
module.exports = {
    getFileByID: getFileByID,
    getFilesByType: getFilesByType,
    getAllFiles: getAllFiles,
    createFile: createFile,
    updateFile: updateFile,
    deleteFile: deleteFile
};
