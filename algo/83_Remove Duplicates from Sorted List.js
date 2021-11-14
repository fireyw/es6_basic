/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    var current = head;
    while(current){
        if(current.next !=null && current.val==current.next.val){
            current.next=current.next.next;
        }else{
            current = current.next;
        }
    }
    return head;
};

const n1 = {
    data: 100
}

const n2 = {
    data:200
}

const n3= {
    data:300
}
n1.next = n2;
n2.next = n3;
console.log(n1);
console.log(n2);
console.log(n3);
