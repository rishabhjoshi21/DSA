1/**
2 * @param {number[]} nums
3 * @return {number}
4 */
5var removeDuplicates = function(nums) {
6    if (nums.length === 0) return 0;
7
8    let i = 0;
9
10    for (let j = 1; j < nums.length; j++) {
11        if (nums[j] !== nums[i]) {
12            i++;
13            nums[i] = nums[j];
14        }
15    }
16
17    return i + 1;
18};