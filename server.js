/*
 * @author Vu Truong
 */
// server.js
// BASE SETUP
// ==============================================
// CORE module
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var server = http.createServer(app);
var cors = require('cors'); // Cross Origin Resource Sharing.
var config = require('./config');
var settings = config.settings();

// Properties reader for localize
var PropertiesReader = require('properties-reader');

// Logger
var log4js = require('log4js');

// Support upload files
// var multer = require('multer');

// Passport is authentication middleware for Node.js
// var passport = require('passport');
// var cookieParser = require('cookie-parser');
var session = require('express-session');

// cross domain
app.use(cors({
    origin: function(origin, callback) {
        var isAllowed = settings.origins.indexOf(origin) > -1;
        callback(null, isAllowed);
    }
}));
// All environments
app.set('port', process.env.PORT || 4000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// BASE Config for supporting JSON 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
log4js.configure('./conf/log4js.json');

// DATABASE
var db = require('./model/db.js');
db.init();
// Stuff we're adding:
app.use(session({
    secret: 'il0VEmYlIFE!',
    key: 'sid',
    cookie: {
        secure: false
    },
}));
// app.use(passport.initialize());
// app.use(passport.session());

// module
var admin = require('./routes/admin');
app.use('/admin', admin);

var user = require('./routes/user');
app.use('/user', user);

var message = require('./routes/message');
app.use('/message', message);

var article = require('./routes/article');
app.use('/articles', article);

var category = require('./routes/category');
app.use('/categories', category);

var auth = require('./routes/authentication');
app.use('/authentication', auth);

var uploader = require('./routes/uploader');
app.use('/uploader', uploader);

var file = require('./routes/file');
app.use('/files', file);

// make a log directory, just in case it isn't there.
try {
    require('fs').mkdirSync('./log');
} catch (e) {
    if (e.code != 'EEXIST') {
        console.error("Could not set up log directory, error was: ", e);
        process.exit(1);
    }
}
// require('./conf/passport.js')(passport);
// START THE SERVER
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
var DIR_APP = __dirname;
module.exports.dirApp = DIR_APP;
