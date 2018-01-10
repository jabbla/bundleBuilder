(function(){
var _modules_ = {};
var _require_ = function(moduleId){
            return _modules_[moduleId].exports;
        };
(function(_require_, module){
var name = 'module1';

module.exports = {
    name: name
};
})(_require_, _modules_[0] = {});
(function(_require_){
const module1 = _require_(0);

console.log(module1.name);
})(_require_);
})();