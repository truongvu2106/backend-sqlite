var config = {
  development: {
    env: 'development',
    hostName: 'https://vuappapi.herokuapp.com/',
    port: 8080,
    origins: ['http://vuappfrontend.herokuapp.com']
  }
};

/**
 * Return configuration settings for the current environment.
 * @returns {Object}
 */

exports.settings = function settings() {
    return config['development'];
};
