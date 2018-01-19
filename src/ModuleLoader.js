class ModuleLoader {
    constructor(option){
        this.func = option.func;
    }
    async run(option){
        let loaderOutput = await this.func(option);


        return Object.assign(option, loaderOutput);
    }
}

module.exports = ModuleLoader;