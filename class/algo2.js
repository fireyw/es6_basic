var MinStack = function () {
    this.elements = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (x) {
    this.elements.push({
        value: x,
        min: this.elements.length === 0 ? x : Math.min(x, this.getMin())
    })
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    return this.elements.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.elements[this.elements.length - 1].value
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.elements[this.elements.length - 1].min

};

var MyQueue = function () {
    this.elements = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.elements.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    return this.elements.shift();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    return this.elements[0];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.elements.length == 0 ? true : false;
};

var obj = new MyQueue()
obj.push(10)
obj.push(20)
console.log(obj);
console.log(obj.pop());
// console.log(obj.peek());
// console.log(obj.empty());

