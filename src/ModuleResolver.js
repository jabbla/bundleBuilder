const utils = require('./lib/utils.js');

class ModuleResolver{
    constructor(option){
        this.entry = option && option.entry;
        this.currentModuleId = 0;
        this.cachedModules = {};
    }
    run(moduleOption){
        let {entry} = this;

        return this._resolveEntry({entry: entry});
    }
    _resolveEntry(entryOption){}
    _resolveNormalModule(moduleOption){}
    _applyModuleLoaders(fileStr){
        return fileStr;
    }
}

module.exports = ModuleResolver;