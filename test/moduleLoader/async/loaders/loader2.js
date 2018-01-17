module.exports = function(fileStr){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(fileStr.replace('${loader2}', 2));
        }, 1000);
    });
};