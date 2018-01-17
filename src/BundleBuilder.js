const fs = require('fs');
const utils = require('./lib/utils.js');

const CjsModuleResolver = require('./CjsModuleResolver.js');
const AmdModuleResolver = require('./AmdModuleResolver.js');

class BundleBuilder{
    constructor(option){
        this.entry = option.entry;
        this.output = option.output;
        this.moduleMode = option.moduleMode || 'commonjs';
        this.loaderFuncs = option.loaders;
    }
    async run(){
        await this._resolveModules();
        return this._emitFile();
    }
    async _resolveModules(){
        let {moduleMode, entry, loaderFuncs} = this,
            moduleResolver,
            moduleOption = {entry, loaderFuncs};

        switch(moduleMode){
            case 'commonjs': 
                moduleResolver = new CjsModuleResolver(moduleOption);
                break;
            case 'amd': 
                moduleResolver = new AmdModuleResolver(moduleOption);
                break;
            default: moduleResolver = new CjsModuleResolver(moduleOption);
        }
        this.bundleString = await moduleResolver.run();
    }
    _emitFile(){
        let {output, bundleString} = this;

        return utils.mustWriteFileAsync(output, bundleString).then(() => {
            console.log(`${output} : build bundleFile success`);
        }).catch((err) => {
            console.log(`${output} : build bundleFile failed`);
        });
    }
}

module.exports = BundleBuilder;