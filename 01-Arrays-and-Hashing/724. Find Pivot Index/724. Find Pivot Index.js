1/**
2 * @param {number[]} nums
3 * @return {number}
4 */
5var pivotIndex = function(nums) {
6    let total = 0;
7    
8    // Calculate total sum
9    for (let num of nums) {
10        total += num;
11    }
12
13    let left = 0;
14
15    // Find pivot index
16    for (let i = 0; i < nums.length; i++) {
17        let right = total - left - nums[i];
18
19        if (left === right) {
20            return i;
21        }
22
23        left += nums[i];
24    }
25
26    return -1;
27};