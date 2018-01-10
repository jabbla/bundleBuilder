const fs = require('fs');
const path = require('path');

const ModuleResolver = require('./ModuleResolver.js');

class CjsModuleResolver extends ModuleResolver {
    constructor(option){
        super(option);
    }
    run(moduleOption){
        return super.run(moduleOption);
    }
    _resolveEntry(entryOption){
        let {entry} = entryOption,
            subModules = [],
            lines = this.lines = [];

        lines.push('(function(){');
        lines.push('var _modules_ = {};');
        lines.push(`var _require_ = function(moduleId){
            return _modules_[moduleId].exports;
        };`)

        let entryFileStr = this._resolveSingleFile({path: entry, subModules: subModules});

        lines.push('(function(_require_){');
        lines.push(subModules.reduce((prev, subModule) => {
            let targetStr = `require(${subModule.pathStr})`,
                newStr = `_require_(${subModule.moduleId})`;

            return prev.replace(targetStr, newStr);
        }, entryFileStr));
        lines.push('})(_require_);');

        lines.push('})();');

        return lines.join('\n');
    }
    _resolveNormalModule(moduleOption){
        let {lines} = this,
            {path: modulePath, moduleId} = moduleOption,
            subModules = []

        let moduleFileStr = this._resolveSingleFile({path: modulePath, subModules: subModules});

        lines.push('(function(_require_, module){');
        
        lines.push(subModules.reduce((prev, subModule) => {
            let targetStr = `require(${subModule.pathStr})`,
                newStr = `_require_(${subModule.moduleId})`;

            return prev.replace(targetStr, newStr);
        }, moduleFileStr));

        lines.push(`})(_require_, _modules_[${this.currentModuleId}] = {});`);

        return this.currentModuleId++;
    }
    _resolveSingleFile(fileOption){
        let {path: filePath, subModules} = fileOption;

        let fileStr = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        });
        let subModulesPath = this._findPaths(fileStr);

        subModulesPath.forEach((subModulePathStr) => {
            let quotePattern = /['"]+/g,
                subModulePath = subModulePathStr.replace(quotePattern, '');
            
            let subModuleId = this._resolveNormalModule({
                path: path.resolve(path.dirname(filePath), subModulePath)
            });

            subModules.push({
                pathStr: subModulePathStr,
                moduleId: subModuleId
            });
        });

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