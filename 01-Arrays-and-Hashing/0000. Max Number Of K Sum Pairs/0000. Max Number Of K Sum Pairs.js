1/**
2 * @param {number[]} nums
3 * @param {number} k
4 * @return {number}
5 */
6var maxOperations = function (nums, k) {
7    // Approach 1 (Two pointer)
8
9    // nums.sort((a, b) => a - b);
10
11    // let left = 0
12    // let right = nums.length - 1
13    // let count = 0
14    // while(left<right){
15    //     if(nums[left] + nums[right] > k){
16    //         right--;
17    //     }else if(nums[left] + nums[right] < k){
18    //         left++
19    //     }else{
20    //         count++
21    //         left++
22    //         right--
23    //     }
24    // }
25    // return count
26
27    // Approach 2 (Using hash map)
28
29    const map = new Map();
30    let count = 0
31    for(let i = 0; i < nums.length; i++){
32        const elem = k - nums[i];
33        if(map.has(elem) && map.get(elem) > 0){
34            count++
35            map.set(elem, map.get(elem) -1)
36        }else{
37            map.set(nums[i], (map.get(nums[i])||0)+1)
38        }
39    }
40    return count
41};