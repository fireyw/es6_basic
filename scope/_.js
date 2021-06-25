function _filter(list, predi) {
    var new_list = [];
    _each(list, function(item){
        if(predi(item)){
            new_list.push(item)
        }
    })
    // for (let i = 0; i <= list.length - 1; i++) {
    //     if (predi(list[i])) {  //중복되는 if조건은 predi 함수를 사용해서 처리
    //         new_list.push(list[i]);
    //     }
    // }
    return new_list;
}
function _map(list, mapper) {
    var new_list = [];
    _each(list, function(item){
        new_list.push(mapper(item))
    })
    // for (let i = 0; i <= list.length - 1; i++) {
    //     new_list.push(mapper(list[i]));
    // }
    return new_list;
}

function _each(list, iter){  //iter 안에서 하는일을 완전히 위임
    for(var i=0; i<list.length; i++){
        iter(list[i]);
    }
    return list;
};


function _curry(fn){
    return function(a,b){
        return arguments.length==2 ? fn(a,b): function(b){ return fn(a,b)};
    }
};
function _curryr(fn){
    return function(a,b){
        return arguments.length ==2? fn(a,b): function(b){return fn(b,a)};
    }
}

var slice= Array.prototype.slice;
function _rest(list, num){
    return slice.call(list,num||1); //num이 false면 1 출력
}

function _reduce(list, iter, memo){
    if(arguments.length==2){
        memo= list[0];
        // list = list.slice('1'); //이렇게 사용할 경우 list가 array인 경우만 가능하며 유사배열은 사용불가
        list = _rest(list);
    }
    _each(list, function(item){
        memo = iter(memo,item);
    })
    return memo;
}

function _pipe(){
    var fns=arguments;
    return function(arg){
        return _reduce(fns, function(arg, fn){ //function:iter, _each:iter(memo,item)
            return fn(arg);
        },arg);
    }
}

function _go(arg){
    var fns=_rest(arguments); //_go 함수 첫번째 요소는 파라미터로 제외, arguments는 유사배열
    return _pipe.apply(null, fns)(arg);
}