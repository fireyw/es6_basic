/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicatesUnsorted = function (ll) {
    let map = {}
    let current = ll

    //traverse and fill my map with node occurences
    while (current) {
        if (!map[current.val]) {
            map[current.val] = 1
        } else {
            map[current.val]++
        }
        current = current.next
    }


    //traverse the list and delete where necessary
    let dummyHead = new ListNode(0, ll)
    current = dummyHead
    while (current) {
        //check for duplicates
        while (current.next && map[current.next.val] > 1) {
            current.next = current.next.next
        }

        current = current.next
    }

    return dummyHead.next

};

var n1 = {
    val: 1
}
var n2 = {
    val: 2
}
var n3 = {
    val: 3
}
var n4 = {
    val: 4
}
n1.next = n2;
n2.next = n3;
n3.next = n4
console.log(deleteDuplicatesUnsorted(n1));
