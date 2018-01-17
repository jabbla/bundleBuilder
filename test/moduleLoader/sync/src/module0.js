var module1 = require('./module1.js');

module.exports = {
    syncLoaders: ${loader1}+${loader2}+module1.syncLoaders
};