/**
 * NPM module
 */
//logger
var logger = require('log4js').getLogger("[Account DAO]");
//database
var db = require('../model/db.js');


/**
 * [getAccountByID description]
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getAccountByID(id, callback) {
    db.Account.find({
        where: {
            id: id
        }
    }).success(function (account) {
        return callback(null, account);
    }).error(function (err) {
        return callback(err);
    });
}

/**
 * [getAccount description]
 * @param  {[type]}   username [description]
 * @param  {[type]}   password [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getAccount(username, password, callback) {
    db.Account.find({
        where: {
            username: username,
            password: password
        }
    }).success(function (userProfile) {
        return callback(null, userProfile);
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
    getAccountByID: getAccountByID,
    getAccount: getAccount
};