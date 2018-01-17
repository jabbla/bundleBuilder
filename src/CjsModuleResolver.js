const fs = require('fs');
const path = require('path');

const ModuleResolver = require('./ModuleResolver.js');

class CjsModuleResolver extends ModuleResolver {
    constructor(option){
        super(option);
    }
    async run(moduleOption){
        return await super.run(moduleOption);
    }
    async _resolveEntry(entryOption){
        let {entry} = entryOption,
            subModules = [],
            lines = this.lines = [];

        lines.push(`
        (function(){
            var _modules_ = {};
            var _require_ = function(moduleId){
                return _modules_[moduleId] && _modules_[moduleId].exports;
            };
        `);

        let entryFileStr = await this._resolveSingleFile({path: entry, subModules: subModules, rootPath: ''});
        
        lines.push(`
            (function(_require_){
                ${subModules.reduce((prev, subModule) => {
                    let targetStr = `require(${subModule.pathStr})`,
                        newStr = `_require_(${subModule.moduleId})`;
        
                    return prev.replace(targetStr, newStr);
                }, entryFileStr)}
            })(_require_);
        })();
        `);

        return lines.join('\n');
    }
    async _resolveNormalModule(moduleOption){
        let {lines} = this,
            {path: modulePath, moduleId, rootPath} = moduleOption,
            subModules = []

        let moduleFileStr = await this._resolveSingleFile({path: modulePath, subModules: subModules, rootPath: rootPath});

        this._templateModuleStr({subModules, moduleFileStr});
        return this.currentModuleId++;
    }
    async _resolveSingleFile(fileOption){
        let {path: filePath, subModules, rootPath} = fileOption;

        let fileStr = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        });

        fileStr = await this._applyModuleLoaders(fileStr);
        return await this._resolveSubModules({rootPath, fileStr, subModules, filePath});
    }
    _templateModuleStr(options){
        let {subModules, moduleFileStr} = options;
        let lines = this.lines;

        lines.push(`
            (function(_require_, module, exports){
                ${subModules.reduce((prev, subModule) => {
                    let targetStr = `require(${subModule.pathStr})`,
                        newStr = subModule.circular? '_require_(-1)' : `_require_(${subModule.moduleId})`;
        
                    return prev.replace(targetStr, newStr);
                }, moduleFileStr)}
            })(_require_, _modules_[${this.currentModuleId}] = {}, _modules_[${this.currentModuleId}].exports = {});
        `);
    }
    async _resolveSubModules(options){
        let {rootPath, fileStr, subModules, filePath} = options;

        let subModulesPath = this._findPaths(fileStr),
            rootPathsMap = rootPath.split('$(divider)').reduce((prev, item) => {
                if(item){
                    prev[item] = true;
                }
                return prev;
            }, {});
        
        for(let i=0; i<subModulesPath.length; i++){
            let subModulePathStr = subModulesPath[i];
            let quotePattern = /['"]+/g,
                subModulePath = subModulePathStr.replace(quotePattern, ''),
                module, subModuleAbsPath = path.resolve(path.dirname(filePath), subModulePath),
                cachedModule = this.cachedModules[subModuleAbsPath];
            
            if(rootPathsMap[subModuleAbsPath]){
                subModules.push({
                    pathStr: subModulePathStr,
                    circular: true
                });
                return;
            }
            if(cachedModule){
                module = {
                    pathStr: subModulePathStr,
                    moduleId: cachedModule.id
                };
            }else{
                let subModuleId = await this._resolveNormalModule({
                    path: subModuleAbsPath,
                    rootPath: `${rootPath}$(divider)${filePath}`
                });
                module = {
                    pathStr: subModulePathStr,
                    moduleId: subModuleId 
                };
                this.cachedModules[subModuleAbsPath] = {id: subModuleId};
            }
            subModules.push(module);
        }
        
        return fileStr;
    }
    _findPaths(fileStr){
        /**简单匹配，不做复杂处理 */
        const requirePattern = /require\((\S*)\)/g;
        let execRes = requirePattern.exec(fileStr),
            paths = [];

        while(execRes){
            paths.push(execRes[1])
            execRes = requirePattern.exec(fileStr);
        }
        return paths;
    }

}

module.exports = CjsModuleResolver;