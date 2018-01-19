module.exports = function(option){
    let {fileStr} = option;
    return {fileStr: fileStr.replace('${loader2}', 2)};
};