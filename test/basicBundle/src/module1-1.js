const module2 = require('./module2-1.js');
const value = 9;

module.exports = {
    name: 'module1-1',
    value: module2.value + value
};