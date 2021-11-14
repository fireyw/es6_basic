class Car{
       constructor(color) {
           this._color=color;
           this._wheel=4;
       }
       drive(){
           console.log('drive');
       }
       stop(){
           console.log(stop);
       }
}

class Bmw extends Car{
    constructor(color) {
        super(color);
        this._navi='I-navi';
    }
    get navi(){
        return this._navi;
    }
    park(){
        console.log('park');
    }
    drive(){ //method overriding
        console.log('bmw drive');
    }
}

const bm5= new Bmw('blue');
console.log(bm5._color);;
