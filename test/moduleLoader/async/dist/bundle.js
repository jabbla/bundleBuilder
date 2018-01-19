
        (function(){
            var _modules_ = {};
            var _require_ = function(moduleId){
                return _modules_[moduleId] && _modules_[moduleId].exports;
            };
        

            (function(_require_, module, exports){
                module.exports = {
    asyncLoaders: 1+2
};
            })(_require_, _modules_[0] = {}, _modules_[0].exports = {});
        

            (function(_require_, module, exports){
                var module1 = _require_(0);

module.exports = {
    asyncLoaders: 1+2+module1.asyncLoaders
};
            })(_require_, _modules_[1] = {}, _modules_[1].exports = {});
        

            (function(_require_){
                var module0 = _require_(1);

_output_ = module0.asyncLoaders;
            })(_require_);
        })();
        