/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {

    if (n <= 2) {
        return arr[n]
    }else if(arr[n]!=undefined){
        return arr[n]
    }
    else {
        arr[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
        return arr[n]
    }
    console.log(arr);
    return arr[n];
};

var arr = {0: 0, 1: 1, 2: 1}

console.log(tribonacci(25));
