/**
 * This file will create the connection to the db and load all model to create the relationship, 
 * It also provide function to init data for server
 */
var fs = require('fs');
var path = require('path');
var logger = require('log4js').getLogger('Database');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './database/vuapp_db.sqlite3'
});
var db = {};
// Load all model
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'db.js');
}).forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});
// Generate the foreignKey by call associate function in earch model
Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
/**
 * Create data for first using
 * @return {void}
 */
function init() {
    logger.info("initialize database");
    sequelize.sync({
        force: false
    }).complete(function(err) {
        if (err) {
            logger.fatal(err); //Will be replaced to debug.err
        } else {
            db.Account.count().success(function(count) {
                if (count === 0) {
                    // Init data for Account table
                    logger.debug("initialize Account data");
                    initUserProfile();
                }
            });
            // db.UrlPermission.count().success(function(count) {
            //  if (count === 0) {
            //      // Init data for UrlPermission table
            //      logger.debug("initialize UrlPermission data");
            //      initUrlPermission();
            //  }
            // });
            db.Category.count().success(function(count) {
                if (count === 0) {
                    // Init data for Category table
                    logger.debug("initialize Category data");
                    initCategory();
                }
            });
        }
    });
}
/**
 * Init data for UserProfile table
 * @return {void}
 */
function initUserProfile() {
    db.Account.bulkCreate([{
        username: 'admin',
        roles: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3'
    }]);
}
/**
 * Init data for UrlPermission table
 * @return {void}
 */
// function initUrlPermission() {
//     // Load data for url permission, because of big data, init data is saved in init_urlPermissions.js.
//     var urlPermissionsObject = fs.readFileSync(__dirname + "/../database/init_urlPermissions.js");
//     var urlPermissions = JSON.parse(urlPermissionsObject);
//     db.UrlPermission.bulkCreate(urlPermissions);
// }

/**
 * Init data for Category table
 * @return {void}
 */
function initCategory() {
    // Load data for category, init data is saved in init_category.js.
    var categoriesObject = fs.readFileSync(__dirname + "/../database/init_category.js");
    var categoriesJson = JSON.parse(categoriesObject);
    var currentDate = new Date();
    categoriesJson.forEach(function(category) {
        category.createdDate = currentDate;
    });
    db.Category.bulkCreate(categoriesJson);
}
/**
 * Init data for about us table
 * @return {void}
 */
function initAboutUs() {
    var aboutUsObject = fs.readFileSync(__dirname + "/../database/init_aboutUs.js");
    var aboutUsJson = JSON.parse(aboutUsObject);
    db.AboutUs.bulkCreate(aboutUsJson);
}

db.init = init;
db.sequelize = sequelize;
module.exports = db;