const User=function(name,age){
    this._name=name;
    this._age=age;
}

const dlwb= new User('dlwb', '38');
User.prototype.showInfo=function(){
    console.log(this._name, this._age)
}
dlwb.showInfo();

class User2{
    constructor(name, age) {
        this._name= name;
        this._age=age;
    }
    showInfo(){
        console.log(this._name, this._age)
    }
}

const yw= new User2('yw', '38');

yw.showInfo();

for (const ywKey in yw) {
    console.log(ywKey);
}