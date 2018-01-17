const Promise = require('bluebird');
const fs = require('fs');
const Path = require('path');
Promise.promisifyAll(fs);

const utils = {};

utils.mustWriteFileAsync = function(path, str){
    return utils.mkdir(Path.dirname(path)).then(function(){
        return fs.writeFileAsync(path, str);
    });
};

utils.mkdir = (function(){
    function mkdir(path, callback){
        var exists = fs.existsSync(path);
        if(exists){
            callback();
        }else{
            mkdir(Path.dirname(path), function(){
                fs.mkdirSync(path);
                callback();
            });
        }
    }
    return Promise.promisify(mkdir);
})();

utils.mustDeleteDir = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

utils.testBundleFile = function(path){
    var fileStr = fs.readFileSync(path, {
        encoding: 'utf-8'
    });

    let wraper = `
        (function(){
            var _output_;
            ${fileStr}
            return _output_;
        })();
    `
    return eval(wraper);
};

utils.seriesPromise = function(promiseGenerators, input){
    var index = 1;
    var attachPromiseChain = function(promise){
        if(index === promiseGenerators.length){
            return;
        }
        return promise.then(function(res){
            return attachPromiseChain(promiseGenerators[index++](res)) || Promise.resolve(res);
        })
    };
    
    return attachPromiseChain(promiseGenerators[0](input));
};

module.exports = utils;