(function(){
var _modules_ = {};
var _require_ = function(moduleId){
            return _modules_[moduleId].exports;
        };
(function(_require_, module){
module.exports = {
    name: 'module2-1',
    value: 10
};
})(_require_, _modules_[0] = {});
(function(_require_, module){
const module2 = _require_(0);
const value = 9;

module.exports = {
    name: 'module1-1',
    value: module2.value + value
};
})(_require_, _modules_[1] = {});
(function(_require_, module){
module.exports = {
    name: 'module1-2.js',
    value: 8
};
})(_require_, _modules_[2] = {});
(function(_require_){
const module1 = _require_(1);
const module12 = _require_(2);

console.log(`module1: ${module1.name}`);
console.log(`module12: ${module12.name}`);

_output_ = module1.value + module12.value;
})(_require_);
})();