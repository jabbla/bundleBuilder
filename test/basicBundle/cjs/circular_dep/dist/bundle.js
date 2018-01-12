
        (function(){
            var _modules_ = {};
            var _require_ = function(moduleId){
                return _modules_[moduleId] && _modules_[moduleId].exports;
            };
        

            (function(_require_, module, exports){
                var module1 = _require_(-1);

_output2_ = module1;
module.exports = {
    name: 'module0'
};
            })(_require_, _modules_[0] = {}, _modules_[0].exports = {});
        

            (function(_require_, module, exports){
                var module0 = _require_(0);

_output1_ = module0.name;
module.exports = {
    name: 'module1'
};
            })(_require_, _modules_[1] = {}, _modules_[1].exports = {});
        

            (function(_require_){
                var module0 = _require_(1);

_output3_ = module0.name;
            })(_require_);
        })();
        