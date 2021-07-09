const log = console.log;

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const add = (a, b) => {
    return a + b;
}

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        // log(i, 'range');
        res.push(i);
    }
    return res;
}
let list = range(5);
console.log('기존:', list);
// console.log(reduce(add, list));
//느긋한 range
const L = {};

L.range = function *(l) {
    let i = -1;
    while (++i < l) {
        // log(i, 'L.range');
        yield i;
    }
}
log('generator: ',list);
list = L.range(5);  //여기까지는 어떤 값도 평가되지 않는다
list.next();
// .next().value 가 실행되어야만 genterator가 실행
// console.log(reduce(add, list));

function test(name, time, f){
    console.time(name);
    while(time--){
        f()
    };
    console.timeEnd(name)
}
test('range', 10, ()=>reduce(add,range(100000))); //range: 66.374ms
test('L.range', 10, ()=>reduce(add,L.range(100000)));//L.range: 39.728ms
console.clear();
//take 중간에 함수를 멈춰주는 함수
const take = curry((l, iter)=>{ //iter=>iterable
    let res = [];
    for(const a of iter){
        res.push(a);
        if(res.length==l) return res;
    }
    return res;
});
//효율
console.time('')
go(
    range(1000000),
    take(5),
    reduce(add),
    console.log
)
console.timeEnd(''); //25.503ms
console.time('')
go(
    L.range(1000000),
    take(5),
    reduce(add),
    console.log
)
console.timeEnd(''); // 0.118ms

//지연평가: 영리하다, 가장 필요할때 평가
//배열을 미리 만들어두지 않고 실제 값을 뽑을때만 값을 만들어 낸다 ex)reduce
//es6전 자바스크립트에서는 구현하기가 어려웠다 iterable 프로토콜 및 제너레이터로 구현할 수 있게 됨

console.clear();

L.map= function *(f,iter){
    for(const a of iter) yield f(a);
}

let it=L.map(a=>a+10,[1,2,3]);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
console.log(...it);

L.filter= function *(f, iter){
    for(const a of iter) if(f(a)) yield a;
}
let xxFilter = filter(a=>a>1,[1,2,3]);
console.log(...xxFilter);
















