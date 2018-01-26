const Async = require('async');
const Tapable = require('./lib/Tapable.js');

const ModuleLoader = require('./ModuleLoader.js');

const utils = require('./lib/utils.js');

class ModuleResolver{
    constructor(option){
        this.entry = option && option.entry;
        this.currentModuleId = 0;
        this.cachedModules = {};
        this.loaderFuncs = option.loaderFuncs || [];
        Tapable.call(this);
    }
    async run(moduleOption){
        this.applyPlugins('run', this);

        let {entry} = this;

        return await this._resolveEntry({entry: entry});
    }
    async _resolveEntry(entryOption){
        await this.applyPluginsAsync('resolve-entry', this, entryOption);
    }
    async _resolveNormalModule(moduleOption){
        await this.applyPluginsAsync('resolve-module', this, moduleOption);
    }
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
    async _resolveSingleFile(fileOption){
        await this.applyPluginsAsync('resolve-module-file', this, fileOption);
    }
    _templateModuleStr(options){
        this.applyPlugins('module-template', this, options);
    }
}
Tapable.mixin(ModuleResolver.prototype);

module.exports = ModuleResolver;