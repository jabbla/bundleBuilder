const module2 = require('./module2-1.js');
const value = 9;

exports.name = 'module1-1';
exports.value = module2.value + value;