/**
 * @author Vu Truong
 */

var fs = require('fs');
var path = require('path');
var logger = require('log4js').getLogger('FILE-SERVICE');

var methods = {};

methods.saveToS3 = function(fileStream, callback) {
    
};


methods.deleteFile = function(filePath, callback) {
	if (!filePath) return;
	var filePathArray = filePath.split('/');
	var url = path.join(__dirname, '../public/images', filePathArray[filePathArray.length - 1]);
	// Check file exists
	if (!fs.existsSync(url)) return;
    return fs.unlinkSync(url);
};

module.exports = methods;