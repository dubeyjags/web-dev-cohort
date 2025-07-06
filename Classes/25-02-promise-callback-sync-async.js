console.log('start');
function myFunction(a,b,cb){
    let sum = a + b
    cb(sum)
}

console.log(myFunction(2,4))

console.log('end');
