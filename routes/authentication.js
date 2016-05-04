var express = require('express');
var router = express.Router();
var passport = require('passport');
var logger = require('log4js').getLogger('AUTHENTICATION');
// Constant
var HEADER_NAME = 'Content-Type';
var CONTENT_TYPE = 'application/json';
var db = require('../model/db.js');
var accountDAO = require('../dao/accountDAO.js');
var auth = require('../services/auth.js');

router.post('/', login);

// function loginForm(req, res) {
//  res.render("login-page");
// }

/**
 * [login description]
 * @param  {Object} req [Request]
 * @param  {Object} res [Response]
 * @return {[type]}     [description]
 */
function login(req, res) {
    var functionName = "login"; 
    logger.info("START " + functionName + " [data=" + JSON.stringify(req.body) + "]");

    // Get data.
    var username = req.body.username;
    var password = req.body.password;

    // Validate request.
    if (!username || !password) return res.send(400);

    accountDAO.getAccount(username, password, function(err, account) {
        if (!err && account) {
            logger.info('authenticate successful');
            res.status(201).send({token: auth.createAuthenticatedJWT(account.id, false), account: account});
        } else {
            logger.error('authenticate failed', err);
            res.send(401);
        }
    });
}

// function changePassword(req, res, next) {
//  var functionName = "changePassword";    
//  logger.info("START " + functionName + " [data=" + JSON.stringify(req.body) + "]");
//  logger.info("[user=" + JSON.stringify(req.session.passport.user) + "]");
//  if(req.session.passport.user) {
//      var username = req.session.passport.user.user_name;
//      var password = req.body.currentPassword;
//      db.UserProfile.find({
//          where: {
//              user_name: username,
//              password: password
//          }
//      }).success(function (user) {
//          if(user) {
//              user.password = req.body.newPassword;
//              db.sequelize.transaction(function(t) {
//                  user.save({
//                      transaction: t
//                  }).success(function(user) {
//                      t.commit();
//                      callback(null, user);
//                      logger.info("END " + functionName + " successful");
//                      res.send(200);
//                  }).error(function(err) {
//                      logger.error(err);
//                      t.rollback();
//                      callback(err);
//                      res.send(500);
//                  });
//              });

//          } else {
//              res.send(400);
//              logger.info("END " + functionName + " not found user");
//          }
//      }).error(function (err) {
//          logger.error(err);
//          res.send(403);
//          logger.info("END " + functionName + " error");
//      });
//  } else {
//      res.send(403);
//      logger.info("END " + functionName + " error");
//  }
// }
module.exports = router;