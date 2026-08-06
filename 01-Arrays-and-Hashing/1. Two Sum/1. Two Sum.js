1/**
2 * @param {number[]} nums
3 * @param {number} target
4 * @return {number[]}
5 */
6var twoSum = function(nums, target) {
7    const map = new Map()
8    for (let i = 0; i < nums.length; i++) {
9        const complement = target - nums[i];
10        if (map.has(complement)) {
11            return [map.get(complement), i];
12        }
13        map.set(nums[i], i);
14    }
15    // Return an empty array if no solution is found
16    return [];
17};