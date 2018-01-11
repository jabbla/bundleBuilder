(function(){
var _modules_ = {};
var _require_ = function(moduleId){
            return _modules_[moduleId].exports;
        };
(function(_require_, module, exports){
module.exports = {
    name: 'module2-1',
    value: 10
};
})(_require_, _modules_[0] = {}, _modules_[0].exports = {});
(function(_require_, module, exports){
const module2 = _require_(0);
const value = 9;

exports.name = 'module1-1';
exports.value = module2.value + value;
})(_require_, _modules_[1] = {}, _modules_[1].exports = {});
(function(_require_, module, exports){
module.exports = {
    name: 'module1-2.js',
    value: 8
};
})(_require_, _modules_[2] = {}, _modules_[2].exports = {});
(function(_require_){
const module1 = _require_(1);
const module12 = _require_(2);

console.log(`module1: ${module1.name}`);
console.log(`module12: ${module12.name}`);

_output_ = module1.value + module12.value;
})(_require_);
})();