const ModuleLoader = require('./ModuleLoader.js');

const utils = require('./lib/utils.js');

class ModuleResolver{
    constructor(option){
        this.entry = option && option.entry;
        this.currentModuleId = 0;
        this.cachedModules = {};
        this.loaderFuncs = option.loaderFuncs || [];
    }
    run(moduleOption){
        let {entry} = this;

        return this._resolveEntry({entry: entry});
    }
    _resolveEntry(entryOption){}
    _resolveNormalModule(moduleOption){}
    _applyModuleLoaders(fileStr){
        let res = fileStr,
            {loaderFuncs} = this;
        
        let promiseGenerators = this.loaderFuncs.map(func => {
            let moduleLoader = new ModuleLoader({func});
            return moduleLoader.run.bind(moduleLoader);
        });

        return utils.seriesPromise(promiseGenerators, fileStr);
    }
}

module.exports = ModuleResolver;