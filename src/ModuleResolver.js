const Async = require('async');

const ModuleLoader = require('./ModuleLoader.js');

const utils = require('./lib/utils.js');

class ModuleResolver{
    constructor(option){
        this.entry = option && option.entry;
        this.currentModuleId = 0;
        this.cachedModules = {};
        this.loaderFuncs = option.loaderFuncs || [];
    }
    async run(moduleOption){
        let {entry} = this;

        return await this._resolveEntry({entry: entry});
    }
    async _resolveEntry(entryOption){}
    async _resolveNormalModule(moduleOption){}
    async _applyModuleLoaders(fileStr){
        let {loaderFuncs} = this;
        
        let promiseGenerators = this.loaderFuncs.map(func => {
            let moduleLoader = new ModuleLoader({func});
            return moduleLoader.run.bind(moduleLoader);
        });

        promiseGenerators.unshift(async function(){
            return {fileStr};
        });

        return new Promise(function(resolve, reject){
            
            Async.waterfall(promiseGenerators, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.fileStr);
                }
            });
        })
    }
}

module.exports = ModuleResolver;