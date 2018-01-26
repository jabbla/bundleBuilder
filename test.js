var promise = require('bluebird');

var test = function(arg1, arg2, callback){
    setTimeout(function(){
        callback(arg1, arg2);
    }, 1000);
};

var test1 = promise.promisify(test);

test1(1, 2).then(function(res){
    console.info(res);
}).catch(function(err){
    console.error('error', err);
});
