module.exports = function(option){
    let {fileStr} = option;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({fileStr: fileStr.replace('${loader1}', 1)});
        }, 100);
    });
};