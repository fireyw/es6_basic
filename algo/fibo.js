let arr = {0: 0, 1: 1};
function fiboStart(val) {
    return fiboDown(val, arr);
}
//하양식
function fiboDown(i, arr) {
    if (i == 0 || i == 1) {
        return i;
    }
    if (arr[i] == undefined) {
        console.log('write:', i);
        arr[i]= fiboStart(i - 1, arr) + fiboStart(i - 2, arr)
    }
    return arr[i];
}
//상향식
function fiboUp(r, arr){
    if(r==0 || r==1){
        return r;
    }
    for(let i=2; i<=r; i++){
        arr[i]= arr[i-1]+arr[i-2]
    }

    return arr[r]
}

console.log(fiboStart(12));

// console.log(fiboUp(6));
