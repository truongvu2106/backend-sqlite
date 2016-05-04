/*
 * @author Vu Truong
 *
 * GET admin page.
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();
//logger
var logger = require('log4js').getLogger("[ADMIN]");

router.get('/',
	// passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true }),
	function(req, res) {
		logger.info(JSON.stringify(req.session));
		if(req.session.passport.user) {
			res.render('admin', { title: 'Administrator' });
		} else {
			res.redirect('/auth/login');
		}
});

module.exports = router;