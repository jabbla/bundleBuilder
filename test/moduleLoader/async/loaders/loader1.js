module.exports = function(fileStr){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fileStr.replace('${loader1}', 1));
        }, 1000);
    });
};