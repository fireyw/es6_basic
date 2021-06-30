var c=10;

function add2(a,b){
    return a+b+c;
}

console.log(add2(10, 5));
console.log(add2(10, 5));
c=100;
console.log(add2(10, 5));
console.log(add2(10, 5));

var obj={val:10};

function add4(obj, a){
    obj.val+=a;
}

console.log(obj);
add4(obj,10);
console.log(obj);


function add5(obj, a){
    return {val:obj.val+a}
}

console.log(obj.val);
console.log(add5(obj, 10));
console.log(obj.val);
