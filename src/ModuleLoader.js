class ModuleLoader {
    constructor(option){
        this.func = option.func;
    }
    run(option){
        let {fileStr} = option;

        let loaderOutput = this.func(fileStr);

        if(typeof loaderOutput === 'string'){
            return Promise.resolve(loaderOutput);
        }

        return loaderOutput;
    }
}

module.exports = ModuleLoader;