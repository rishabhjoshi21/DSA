1/**
2 * @param {number[]} nums
3 * @param {number} k
4 * @return {number}
5 */
6var maximumSubarraySum = function(nums, k) {
7    let left = 0;
8    let right = 0;
9    let totalSum = 0
10    let result = 0
11    let set = new Set()
12    while(right < nums.length){
13        while(set.has(nums[right])){
14            totalSum -= nums[left]
15            set.delete(nums[left]);
16            left++
17        }
18        set.add(nums[right])
19        totalSum += nums[right]
20        if(right - left +1 === k){
21            result = Math.max(totalSum, result)
22            totalSum -= nums[left]
23            set.delete(nums[left])
24            left++
25        }
26        right++
27
28    }
29    return result
30    
31};