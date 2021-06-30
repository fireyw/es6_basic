function HelloFunc(){
    this.greeting="hello"
}

HelloFunc.prototype.call= function(func){
    func? func(this.greeting): this.func(this.greeting);
}

var userFunc= (greeting)=>{
    console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;
// objHello.call();

function saySomething(obj, methodName, name){
    console.log("saySomething");
    return (function(greeting){
        console.log("greeting :"+ greeting );
        return obj[methodName](greeting, name);
    })
}

function newObj(obj, name){
    console.log("newObj");
    obj.func= saySomething(this, 'who', name);
    return obj;
}

newObj.prototype.who= function(greeting, name){
    console.log(greeting + " " + (name||"everyone"));
}

var obj1 = new newObj(objHello, "zoon");
obj1.call();