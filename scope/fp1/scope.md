* Scope 
    * Scope: 범위, 유효공간
    * 함수스코프: 함수에 의해서 생기는 범위, 변수의 유효범위(es6전 범위), 변수 var
    * 블록스코프: { } 중괄호에 의해서 생기는 유효범위(es6), 변수 let const  
        * Hoisting?크게 문, 식, 값으로 나누어짐
            * if문, for문, while문, switch문 ->**블록 스코프**
            * 식. expression 값이 될 수 있는 경우
            * 값
            * var 호이스팅
                1. 변수명을 위로 올리고
                2. undefined를 할당한다
            * let 호이스팅(호이스팅을 하긴 함)
                1. 변수명만 위로 올린다 / 끝 -> 사용시 에러발생
        ~~~
        Hoisting는 블록스코프에 해당 안된다
        TDZ(Temporary DEAD ZONE)->let,const해당
        let, const는 변수가 해당위치에 오기 전까지 실행 할 수 없다
        if(true){
            let a=10;
            if(true){
                console.log(a);   //ReferenceError TDZ 
                const a=20;
            }
            console.log(a)
        }
        console.log(a); //error TDZ
        ~~~
        
        ~~~      
        var value=0;
        var obj={
            value:1,
            setValue: function (){
                this.value=2; //this: obj >obj.value = 2;
                (function(){
                    this.value=3; // this: window
                })();
            }
        }
        obj.setValue(); //setValue 메소드 호출 -> 메소드this는 호출한 객체
        console.log(value);  //브라우저에서 실행시 3
        console.log(obj.value);         //2
        ~~~
        ~~~ 
        //apply this 주입
        (function(){
            this.value=3; // apply를 통해 this: obj
        }).apply(this);
        //or
        var a= function(){
            this.value=3; // this: window
        };
        a.apply(this)
        ~~~          
        * let은 var과 같이 this를 주입할 필요가 없다. 블록안해서 모두 같은 this를 본다
        
        ~~~
        let a={a:1} 
        const b=a; 
        //a: {a: 1} , b:{a:1}
        a=20;
        // a: 20
        b
        //b {a: 1}
        
        //위 내용 정리
        a값이 가르키는 것은 해당 값들이 저장된 주소이다. a:1이 저장되어있는 메모리 공간을 바라보고 있다가 a가 20을 바라보게 변경됨
        b는 const 임으로 처음 가르키고 있던 주소값을 계속 보고있다
        ~~~
      
        ~~~
        const 객체내 속성 값은 변경 가능
        const b={prop1:10, prop2:20}      
        b.prop1=30;
        b//{prop1:30, prop2:20}
        이와 같이 const도 객체 내 속성 및 배열 내 값은 변경가능하다
        내부값도 변경할 수 없게 하는 방법 -> DeepFreezing
        1. freeze 함수사용
        2. 내부의 프로퍼티를 순환하면서 freeze 재귀함수로 돌리면됨
        ~~~
    * 얕은 복사
        * 얕은 복사란 객체를 복사할 때 위의 예제처럼 원래값과 복사된 값이 같은 참조를 가리키고있는 것을 말한다. 객체안에 객체가 있을 경우 한개의 객체라도 원본 객체를 참조하고 있다면 이를 얕은 복사라고 한다.
        ~~~
        const obj = {
          a: 1,
          b: {
            c: 2,
             }
          };
            
        const copiedObj = Object.assign({}, obj); //1단계만 깊은복사
        
        copiedObj.b.c = 3 //obj.a 와 같이 1단계 복사는 깊은복사 즉 서로 연결이 끊어져 있으나 b 객체 내부는 얕은복사
        
        obj === copiedObj // false
        obj.b.c === copiedObj.b.c // true
        ~~~
      * 깊은 복사(immatable)
        * 깊은 복사된 객체는 객체안에 객체가 있을 경우에도 원본과의 참조가 완전히 끊어진 객체를 말한다.
        * 재귀함수를 통한 복사 or JSON.stringfy 사용
        ~~~
        const obj = {
        a: 1, b: { c: 2, }, };
        
        function copyObj(obj) { const result = {};
        
        for (let key in obj) {
        if (typeof obj[key] === 'object') 
            { result[key] = copyObj(obj[key]); } 
        else { result[key] = obj[key]; } }
        
        return result; }
        
        const copiedObj = copyObj(obj);
        
        copiedObj.b.c = 3
        
        obj.b.c === copiedObj.b.c //false         
        ~~~
    * 프로젝트 시 객체의 경우 const로 선언하는것이 유리하다. 
        * 중복선언을 막을 수 있음
        * const내의 객체는 let과 같이 변경 가능

    * var 사용 시 클로저 관련 단골문제
        * var i 가 블록단위가 아니라 함수단위로 i가 3 3 3 3 으로 찍히는 내용 즉시실행함수로 변경
        * for문 var i -> let i 로 바꾸면 전혀문제가안됨
    ~~~
    function countSeconds(howMany) {
        for (var i = 1; i <= howMany; i++) {
            (function(currentI){
                setTimeout(function () {
                    console.log(currentI)
                }, currentI * 1000);
            }(i))
        }
    }
    
    countSeconds(3);
    ~~~
    







