//database
var db = require('../model/db.js');

/**
 * [getMessageByID description]
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getMessageByID(id, callback) {
    db.Message.find({
        where: {
            id: id
        }
    }).success(function(message) {
        return callback(null, message);
    }).error(function (err) {
        return callback(err);
    });
}

/**
 * [getAllMessages description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getAllMessages(callback) {
    db.Message.findAll().success(function(messages) {
        messages = messages || [];
        return callback(null, messages);
    }).error(function (err) {
        return callback(err);
    });
}

function createMessage(message, callback) {
    db.sequelize.transaction(function(t) {
        db.Message.create(message, {
            transaction: t
        }).success(function(message) {
            t.commit();
            callback(null, message);
        }).error(function(err) {
            t.rollback();
            err.status = 500;
            callback(err);
        });
    });
}

function updateMessage(message, callback) {
    db.sequelize.transaction(function(t) {
        message.save({
            transaction: t
        }).success(function(message) {
            t.commit();
            callback(null, message);
        }).error(function(err) {
            t.rollback();
            err.status = 500;
            callback(err);
        });
    });
}

/**
 * [deleteMessage description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteMessage(id, callback) {
    db.Message.destroy({
        id: id
    }).success(function(affectedRows) {
        return callback(null, affectedRows);
    }).error(function (err) {
        return callback(err);
    });
}

function countUnreadMessages(callback) {
    db.Message.count({
        where: {
            unread: true
        }
    }).success(function(count) {
        count = count || 0;
        return callback(null, count);
    }).error(function (err) {
        return callback(err);
    });
}

/**
 * exports modules
 * @type {Object}
 */
module.exports = {
    getMessageByID: getMessageByID,
    getAllMessages: getAllMessages,
    createMessage: createMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage,
    countUnreadMessages: countUnreadMessages
};