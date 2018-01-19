const babel = require('babel-core');

module.exports = function(option){
    let {fileStr} = option;
    return {fileStr: babel.transform(fileStr, {babelrc: false, presets: ['env']}).code};
};