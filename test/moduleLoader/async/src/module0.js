var module1 = require('./module1.js');

module.exports = {
    asyncLoaders: ${loader1}+${loader2}+module1.asyncLoaders
};