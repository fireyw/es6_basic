var users = [
    {id: 1, name: 'YW', age: 21},
    {id: 2, name: 'DG', age: 30},
    {id: 3, name: 'KB', age: 30},
    {id: 4, name: 'QW', age: 35},
    {id: 5, name: 'BC', age: 9},
    {id: 6, name: 'DW', age: 11},
    {id: 7, name: 'A1', age: 36},
    {id: 8, name: 'B1', age: 36},
];


console.clear();

function _filter(list, predi) {
    var new_list = [];
    _each(list, function (item) {
        if (predi(item)) {
            new_list.push(item)
        }
    })
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function (item, key) {
        new_list.push(mapper(item, key))
    })
    // for (let i = 0; i <= list.length - 1; i++) {
    //     new_list.push(mapper(list[i]));
    // }
    return new_list;
}

function _curry(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(a, b)
        };
    }
};

function _curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(b, a)
        };
    }
}

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});


//map과 filter를 동시에 사용하여 더 간략히 표현 가능
console.log(_map(_filter(users, function (list) {
        return list.age > 30;
    }),
    _get('name')
));

var user1 = users[0];
console.log(user1.name);
console.log(_get(user1, 'name'));
console.log(_get('name')(user1)); //curryr로 실행 시 파라미터 위치 바낌

var get_name = _get('name');
console.log(get_name(user1));


//명령형 코드
//1. 30세 이상을 거른다
var temp = [];
for (let i = 0; i <= users.length - 1; i++) {
    if (users[i].age > 30) {
        temp.push(users[i]);
    }
}

//1. FP로 변경 고차함수
//함수를 리턴하거나 파라미터로 받아서 활용
console.log(_filter(users, function (user) {
    return user.age < 30
}));
//이처럼 users 만을 위한 함수가 아니라 다른 객체도 사용할 수 있음
console.log(_filter([1, 2, 3, 4], function (num) {
    return num > 3
}));

//2 30세 이상의 name을 수집
//다형성이 높고 데이터가 어떻게 생겼는지 볼 수 없다 즉 관심사가 완전히 불리

//map, filter는 array를 리턴
//reduce: 축약하다. 들어온 값을 변경시켜 새로운 객체나 값을 반환
var slice = Array.prototype.slice;

function _rest(list, num) {
    return slice.call(list, num || 1); //num이 false면 1 출력
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        // list = list.slice('1'); //이렇게 사용할 경우 list가 array인 경우만 가능하며 유사배열은 사용불가
        list = _rest(list);
    }
    _each(list, function (item) {
        memo = iter(memo, item);
    })
    return memo;
}

var add = function (a, b) {
    return a + b;
}
console.log(_reduce([1, 2, 3], add, 0)); //6을 기대 memo는 초기 값
console.log(_reduce([1, 2, 3, 4], add)); //6을 기대 memo는 초기 값
console.clear();

function _pipe() {
    var fns = arguments;
    return function (arg) {
        return _reduce(fns, function (arg, fn) { //1:memo, 2:list 요소
            // console.log('arg: ', arg, ", fn: ", fn);
            return fn(arg);
        }, arg);
    }
}

var f1 = _pipe(
    function (a) {
        return a + 1;
    },
    function (a) {
        return a * a
    },
)

console.log(f1(9));
console.clear();

function _go(arg) {
    var fns = _rest(arguments); //_go 함수 첫번째 요소는 파라미터로 제외, arguments는 유사배열
    return _pipe.apply(null, fns)(arg);
}

_go(2,
    function (a) {
        return a + 1;
    },
    function (a) {
        return a * a
    },
    console.log
)
console.clear();
console.log(_map(_filter(users, function (list) {
        return list.age > 30;
    }),
    _get('name') // function (list) { return list.name;}
));

_go(users,
    function (users) {
        return _filter(users, function (list) {
            return list.age > 30;
        })
    },
    function (users) {
        return _map(users, _get('name'));
    },
    console.log
)

console.clear();

var _map = _curryr(_map),
    _filter = _curryr(_filter);

console.log(_map([1, 2, 3, 4], function (val) {
    return val * 2;
}));  //인자가 2개일 경우 curryr 하기 전처럼 동작
console.log(_map(function (val) {
    return val * 2;
})([1, 2, 3, 4]));
//결국 curryr를 사용해서 _map함수 덩어리에 ([1,2,3,4]) 파라미터가 넘어간 것과 동일하게 된다

console.clear();
_go(users,
    _filter(function (list) {
        return list.age > 30;
    }),
    _map(_get('name')),
    console.log
)

_go(users,
    _filter(list => list.age > 30),
    _map(user => user.name),
    console.log
)
console.clear();

let _length = _get('length');

// console.log((null['length']));
console.log(_length(null));
console.log(_length);

console.log(_keys({name: 1, age: 2}));
console.log(_keys([1, 2, 3, 4, 5]));
console.log(_keys(10));
console.log(_keys(null));

function _is_object(obj) {
    return typeof "object" && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

//아래 예제는 객체로 length가 없어 빈 객체만 반환한다
_each({
    'a': 13,
    'b': 23
}, function (val) {
    console.log(val);
});

function _each(list, iter) {  //iter 안에서 하는 일을 완전히 위임
    var keys = _keys(list); //배열 객체 모두 키값 배열로 반환
    for (var i = 0; i < keys.length; i++) {
        iter(list[keys[i]], keys[i]);
    }
    return list;
};

console.log(_map({
    13: 'fireyw',
    45: 'kyw'
}, function (val) {
    console.log(val);
    return val.toUpperCase()
}));

_go({
        13: 'fireyw',
        15: 'kyw'
    },
    _map(function (item) {
        return item.toUpperCase();
    }),
    console.log);

_go({
        1: users[0],
        3: users[1]
    }, _map(function (item) {
        return item.name.toUpperCase();
    }),
    console.log
);
console.clear();

function _values(val) {
    return _map(val, _identity)
}

var _values = _map(_identity); //curryr을 통해 위와 같다

//values의 보조함수와 동일함
function _identity(val) {
    return val;
}

// console.log(_values(users[0]));
// console.log(_map(_identity)(users[0])); //curryr를 통해 평가순서를 뒤집음

function _pluck(data, key) {
    return _map(data, _get(key)); //_get(key)(item) 형태로 curryr이 적용
}

//값들을 간략하게 빼올수 있다
// console.log(_pluck(users, 'age'));

//거르기
// console.log(_reject(users, function (item) {
//     return item.age > 30;
// }));

function _reject(data, predi) {
    console.log(predi);
    // return _filter(data, function(val){
    //     return !predi(val)
    // })
    return _filter(data, _negate(predi))
}

var _reject = _curryr(_reject);

function _negate(func) {
    return function (val) {
        return !func(val)
    }
}

function _compact(data) {
    return _filter(data, _identity)
}

// console.log(_compact([1, 2, null, "", {}, undefined]));

//find: 찾아내기, 제일 처음 predi를 true로 반환하는 값을 찾는다. filter는 전체를 찾지만 find는 1개만 찾음
//값 찾은 후 빠져나와 최적화에 좋
var _find = _curryr(function (list, predi) {  //iter 안에서 하는 일을 완전히 위임
    var keys = _keys(list); //배열 객체 모두 키값 배열로 반환
    for (var i = 0; i < keys.length; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val;
    }
    return;
});

var _find_index = _curryr(function (list, predi) {  //iter 안에서 하는 일을 완전히 위임
    var keys = _keys(list); //배열 객체 모두 키값 배열로 반환
    for (var i = 0; i < keys.length; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
});
//some 조건에 맞는 값이 하나라도 있으면  true
//every 모든 값이 조건에 맞아야 true
function _some(list, predi) {  //iter 안에서 하는 일을 완전히 위임
    return _find_index(list, predi || _identity) != -1;
};

// console.log(_every([1, 2, 3, 4, 5], function (item) {
//     return item > 0
// }));

function _every(list, predi) {
    return _find_index(list, _negate(predi)) == -1;
}

// console.log(_some([1]));
console.log(_some(users, function (item) {
    return item.age > 20;
}));

function _min(data) {
    return _reduce(data, function (a, b) {
        return a < b ? a : b;
    })
}

function _max(data) {
    return _reduce(data, function (a, b) {
        return a > b ? a : b;
    })
}

function _min_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) < iter(b) ? a : b;
    })
}

function _max_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) > iter(b) ? a : b;
    })
}

console.log(_min_by([1, 2, 3, 4, -12], Math.abs));
console.log(_max([1, 2, 3, 4, -12]));
//나이가 가장 어린 유저 출력
console.log(_min_by(users, function (user) {
    return user.age;
}));

var _min_by = _curryr(_min_by)
    , _max_by = _curryr(_max_by)

//_go 함수를 통해 더 많은 로직 처리 가능
// _go(users,
//     _filter((user)=>user.age>30),
//     _max_by((user)=>user.age),
//     _get('name'),
//     console.log);
//
// _go(users,
//     _map(_get('age')),
//     _min,
//     console.log);
//
//group by
console.clear();

function _push(obj, key, val) {
    (obj[key] = obj[key] || []).push(val);
    return obj;
}

var _group_by = _curryr(function (data, iter) {
    return _reduce(data, function (grouped, val) { //grouped: 그룹될 데이터 ,_reduce(list, iter, memo)
        return _push(grouped, iter(val), val);
        //아래 중복내용 함수로 변경
        // var key = iter(val);
        // (grouped[key] = grouped[key] || []).push(val);//grouped[key] = grouped[key]->해당 객체에 값이 있으면 그곳에 push
        // return grouped;
    }, {})
});

// _go(users,
//     _group_by(_get('age')),
//     console.log
// );
//10대별로 그루핑
// _go(users,
//     _group_by(function (user) {
//         return user.age - user.age % 10
//     }),
//     console.log
// )
//첫번째이름 그루핑

function _head(list) {
    return list[0];
}

_go(users,
    _group_by(_pipe(_get('name'), _head)),
    console.log
)

console.clear();

var _inc = _curryr(function (count, key) {
    count[key] ? count[key]++ : count[key] = 1;
    return count;
})

var _count_by = _curryr(function (data, iter) {
    return _reduce(data, function (count, val) {
        return _inc(count, iter(val));
        // var key = iter(val);
        // count[key] ? count[key]++ : count[key] = 1;
        // return count;
    }, {})
});
console.log(_count_by(users, function (user) {
    return user.age - user.age % 10;
}));

console.clear();
// _map(users[0], console.log);
// console.log(_map(users[0], function (val, key) {
//     return [key, val];
// }));

var _pairs = _map((val, key) => [key, val]);

// document.write//this가 document여야만 동작
_go(users,
    _count_by(function (user) {
        return user.age - user.age % 10;
    }),
    _map(function (count, key) {
        return `<li>${key}대는 ${count}명</li>`;
    }),
    list => '<ul>' + list.join('') + '</ul>',
    console.log
);

var _f1 = _pipe(
    _count_by(function (user) {
        return user.age - user.age % 10;
    }),
    _map(function (count, key) {
        return `<li>${key}대는 ${count}명</li>`;
    }),
    list => '<ul>' + list.join('') + '</ul>',
    console.log
);
_f1(users);

var _f2 = _pipe(_reject(user => user.age < 20),
    _f1);
_f2(users);

console.clear();
_go(_range(100),
    console.log);