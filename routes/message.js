/*
 * @author Vu Truong
 * 
 */
var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('Message');
var auth = require('../services/auth.js');
var messageService = require('../services/message.js');
// messageDAO
var messageDAO = require('../dao/messageDAO.js');

// REST
router.get('/:messageID', auth.ensureAuthenticated(null), getMessage);
router.get('/', auth.ensureAuthenticated(null), getMessages);
router.post('/', createMessage);
router.post('/:messageID/reply', auth.ensureAuthenticated(null), replyMessage);
router.delete('/:messageID', auth.ensureAuthenticated(null), deleteMessage);

function getMessage(req, res) {
    var functionName = "getMessage";
    var id = req.params.messageID;
    if (id === 'count') return countUnreadMessages(req, res);
    logger.info("START " + functionName + " [id=" + id + "]");

    messageDAO.getMessageByID(id, function(err, message) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else if (!message) {
            res.status(404);
            res.send('Data not found.');
            logger.error('Data not found.');
        } else {
            res.charset = 'utf-8';
            res.status(200);
            res.send(message);
            message.unread = false;
            messageDAO.updateMessage(message, function() {});
            logger.info("END " + functionName + "[" + JSON.stringify(message) + "]");
        }
    });
}

function getMessages(req, res) {
    var functionName = "getMessages";
    logger.info("START " + functionName);
    messageDAO.getAllMessages(function(err, messages) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.send(messages);
            logger.info("END " + functionName + " [" + JSON.stringify(messages) + "]");
        }
    });
}

function createMessage(req, res) {
    var functionName = "createMessage";
    logger.info("START " + functionName + " [" + JSON.stringify(req.body) + "]");
    // TODO validate data
    var message = req.body;
    message.sentOnDate = (new Date()).getTime();
    message.unread = true;
    messageDAO.createMessage(message, function(err, data) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            res.header("Content-Type", "application/json; charset=utf-8");
            messageService.sendMessage({
                to: message.email,
                text: 'Thanks for your attention. We will reply you as soon as possible',
            });
            res.send(data);
            logger.info("END " + functionName + " [" + JSON.stringify(data) + "]");
        }
    });
}

function replyMessage(req, res) {
    var functionName = "replyMessage";
    var id = req.params.messageID;
    logger.info("START " + functionName);
    // TODO validate data
    var messageReplying = req.body;
    messageService.sendMessage({
        to: messageReplying.emailTo,
        subject: '[VuApp] Reply from VuApp',
        text: messageReplying.content
    }, function(err, reply) {
        if (err) {
            logger.error(err);
            res.send(500);
        } else {
            logger.info("END " + functionName);
        }

    });

    messageDAO.getMessageByID(id, function(err, message) {
        if (!err) {
            message.replyOnDate = (new Date()).getTime();
            message.replied = true;
            message.replyContent = messageReplying.content;
            messageDAO.updateMessage(message, function(err, data) {
                if (err) {
                    logger.error(err);
                }
            });
        }
    });
}

function deleteMessage(req, res) {
    var functionName = "deleteMessage";
    logger.info("START " + functionName);
    var id = req.params.messageID;

    messageDAO.deleteMessage(id, function(err, affectedRows) {
        if (err) {
            logger.error(err);
            res.send(500);
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

function countUnreadMessages(req, res) {
    var functionName = "countUnreadMessages";
    logger.info("START " + functionName);

    messageDAO.countUnreadMessages(function(err, count) {
        if (err) {
            logger.error(err);
            res.send(500);
            logger.info("END " + functionName);
        } else {
            var ret = {
                "count": count
            };
            res.status(200);
            res.send(ret);
            logger.info("END " + functionName + "[" + JSON.stringify(ret) + "]");
        }
    });
}

module.exports = router;