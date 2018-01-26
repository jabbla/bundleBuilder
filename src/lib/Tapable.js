const Tapable = require('tapable');
const Bluebird = require('bluebird');

Tapable.prototype.applyPluginsAsync = Bluebird.promisify(Tapable.prototype.applyPluginsAsync);

module.exports = Tapable;