1/**
2 * @param {number[]} nums
3 * @param {number} k
4 * @return {number}
5 */
6var maxSubarrayLength = function (nums, k) {
7    let left = 0;
8    let right = 0;
9    const map = new Map();
10    let maxWindow = 0
11    while (right < nums.length) {
12        map.set(nums[right], (map.get(nums[right]) || 0) + 1)
13        while (left < right && map.get(nums[right]) > k) {
14            map.set(nums[left], map.get(nums[left]) - 1)
15            left++
16        }
17        maxWindow = Math.max(maxWindow, (right - left) + 1)
18        right++
19    }
20    return maxWindow
21
22};