const module1 = require('./module1-1.js');
const module12 = require('./module1-2.js');

console.log(`module1: ${module1.name}`);
console.log(`module12: ${module12.name}`);

_output_ = module1.value + module12.value;