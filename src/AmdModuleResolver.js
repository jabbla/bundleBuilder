const fs = require('fs');
const path = require('path');

const ModuleResolver = require('./ModuleResolver.js');

class AmdModuleResolver extends ModuleResolver {
    constructor(option){
        super(option);
    }
    run(moduleOption){
        return super.run(moduleOption);
    }
    _resolveEntry(entryOption){
        
        
    }
    _resolveNormalModule(moduleOption){
        
    }
    _resolveSingleFile(fileOption){
        
    }
    _findPaths(fileStr){
        /**简单匹配，不做复杂处理 */
        
    }

}

module.exports = AmdModuleResolver;