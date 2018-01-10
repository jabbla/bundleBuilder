const utils = require('./lib/utils.js');

class ModuleResolver{
    constructor(option){
        this.entry = option && option.entry;
        this.currentModuleId = 0;
    }
    run(moduleOption){
        let {entry} = this;

        if(entry){
            return this._resolveEntry({entry: entry});
        }else{
            let {path} = moduleOption;
            return this._resolveNormalModule({path: path});
        }
        this._createBundleFile();
    }
    _resolveEntry(entryOption){}
    _resolveNormalModule(moduleOption){}
}

module.exports = ModuleResolver;