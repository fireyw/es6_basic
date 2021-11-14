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
var obj = new MinStack();
obj.push(10);
obj.push(20);
obj.push(30);
console.log(obj);
