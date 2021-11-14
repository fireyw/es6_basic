/**
 * https://leetcode.com/problems/linked-list-cycle/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var pos=1;
var hasCycle = function(head) {
    var p1 = head;
    var p2 = head;
    while(p2 && p2.next && p1 && p1.next){
        p1=p1.next;
        p2=p2.next;
        if(p1==p2){
            return true;
        }
    }
    return false;
};

