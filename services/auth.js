/**
 * Module dependencies.
 */

var jwt = require('jwt-simple');
var moment = require('moment');
var accountDAO = require('../dao/accountDAO.js');
// var helper = require('./response-helper');
var logger = require('log4js').getLogger('AUTH');
/**
 * Constants
 */

var SECRET = 'il0VEmYlIFE!';

/**
 * Variable for methods.
 * @type {{}}
 */

var methods = {};

/**
 * Create authenticated JSON web token.
 * @param accountID
 * @param role
 * @param visitor
 * @returns {*}
 */

methods.createAuthenticatedJWT = function(accountID, role) {
    return createJWT(accountID, role);
};

/**
 * Decodes a JSON web token.
 * @param token
 * @returns {*}
 */

methods.decodeJWT = function(token) {
    return jwt.decode(token, SECRET);
};

/**
 * Middleware that authenticates the request using the JWT passed in the header
 * and assigns the account to req.account. Ensures that the token is a fully
 * authenticated token and that the role in the token matches tha allowed roles
 * passed to the middleware.
 * @param roles
 * @returns {Function}
 */
methods.ensureAuthenticated = function(roles) {
    return function(req, res, next) {
        authenticateRequest(req, res, roles, next);
    };
};

/**
 * Authenticate the request.
 * @param req
 * @param res
 * @param roles
 * @param next
 * @returns {*}
 */
function authenticateRequest(req, res, roles, next) {

    var token = req.headers['x-access-token'];

    if (!token) return res.send(401);

    try {
        var decoded = jwt.decode(token, SECRET);

        if (moment() > moment(decoded.exp)) return res.send(401);

        if (roles && roles.length > 0 && roles.indexOf(decoded.role) == -1) return res.send(401);

        accountDAO.getAccountByID(decoded.id, function(err, account) {
            if (!err) {
                req.account = account;
                next();
            } else {
                logger.info(err);
                res.send(401);
            }
        });
    } catch (err) {
        logger.info(err);
        return res.status(401).send({message: 'Invalid token.'});
    }
}

/**
 * Create a JWT.
 * @param accountID
 * @param role
 * @returns {*}
 */

function createJWT(accountID, role) {
    return jwt.encode({
        id: accountID,
        role: role,
        exp: moment().add(1, 'd')
    }, SECRET);
}

/**
 * Export the methods.
 * @type {JSON}
 */
module.exports = methods;