var LocalStrategy = require('passport-local').Strategy;
//logger
var logger = require('log4js').getLogger("[PASSPORT]");
  // , FacebookStrategy = require('passport-facebook').Strategy
  // , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
//database
var db = require('../model/db.js');

module.exports = function(passport) {
	logger.info("config passport...");
	passport.serializeUser(function(user, done) {
		logger.info("serializeUser...");
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		logger.info("deserializeUser...");
		db.UserProfile.find({
			where: {
				id: user.id
			}
		}).success(function (user) {
			return done(null, user);
		}).error(function (err) {
			logger.error(err);
			return done(err);
		});
	});

	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
		},
		function(username, password, done) {
			logger.info('authenticating....');

			db.UserProfile.find({
				where: {
					user_name: username,
					password: password
				}
			}).success(function (user) {
				logger.info('authenticate successful');
				return done(null, user);
			}).error(function (err) {
				logger.error('authenticate failed', err);
				return done(err);
			});
		})
	);
}
	// passport.use(new FacebookStrategy({
	// 	clientID: config.facebook.clientID,
	// 	clientSecret: config.facebook.clientSecret,
	// 	callbackURL: config.facebook.callbackURL
 //    },
 //    function(accessToken, refreshToken, profile, done) {
 //    	profile.authOrigin = 'facebook';
 //    	User.findOrCreateOAuthUser(profile, function (err, user) {
	//       return done(err, user);
	//     });
 //    }));

	// passport.use(new GoogleStrategy({
	//     clientID: config.google.clientID,
	//     clientSecret: config.google.clientSecret,
	//     callbackURL: config.google.callbackURL
	//   },
	//   function(accessToken, refreshToken, profile, done) {
	//   	profile.authOrigin = 'google';
	//     User.findOrCreateOAuthUser(profile, function (err, user) {
	//       return done(err, user);
	//     });
	//   }
	// ));
