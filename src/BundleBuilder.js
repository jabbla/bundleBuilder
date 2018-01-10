const fs = require('fs');
const utils = require('./lib/utils.js');

const CjsModuleResolver = require('./CjsModuleResolver.js');

class BundleBuilder{
    constructor(option){
        this.entry = option.entry;
        this.output = option.output;
        this.moduleMode = option.moduleMode || 'commonjs';
    }
    run(){
        this._resolveModules();
        return this._emitFile();
    }
    _resolveModules(){
        let {moduleMode, entry} = this,
            moduleResolver,
            moduleOption = {
                entry: entry
            };

        switch(moduleMode){
            case 'commonjs': 
                moduleResolver = new CjsModuleResolver(moduleOption);
                break;
            default: moduleResolver = new CjsModuleResolver(moduleOption);
        }
        this.bundleString = moduleResolver.run();
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