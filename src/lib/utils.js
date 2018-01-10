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

module.exports = utils;