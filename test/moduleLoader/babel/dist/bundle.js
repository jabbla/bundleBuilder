
        (function(){
            var _modules_ = {};
            var _require_ = function(moduleId){
                return _modules_[moduleId] && _modules_[moduleId].exports;
            };
        

            (function(_require_, module, exports){
                'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'module1';
exports.name = name;
            })(_require_, _modules_[0] = {}, _modules_[0].exports = {});
        

            (function(_require_, module, exports){
                'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = undefined;

var _module = _require_(0);

var name = 'module0' + _module.name;
exports.name = name;
            })(_require_, _modules_[1] = {}, _modules_[1].exports = {});
        

            (function(_require_){
                'use strict';

var _module = _require_(1);

var a = 1;

_output_ = _module.name;
            })(_require_);
        })();
        