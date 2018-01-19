module.exports = function(option){
    let {fileStr} = option;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({fileStr: fileStr.replace('${loader2}', 2)});
        }, 100);
    });
};