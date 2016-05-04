/*
 * @author Vu Truong
 * 
 */
var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger('USER');
// Constant
var HEADER_NAME = 'Content-Type';
var CONTENT_TYPE = 'application/json';
var accountDAO = require('../dao/accountDAO.js');
// REST
router.get('/:userID', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userID', updateUser);
router.delete('/:userID', deleteUser);

/**
 * [getUser description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getUser(req, res) {
	res.send("this is get user page");
}
function getUsers(req, res) {
	res.send("this is get list user page");
}
function createUser(req, res) {
	res.send("this is create user page");
}
function updateUser(req, res) {
	res.send("this is update user page");
}
function deleteUser(req, res) {
	res.send("this is delete user page");
}


module.exports = router;