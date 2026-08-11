1/**
2 * @param {number[]} nums
3 * @return {number}
4 */
5var missingInteger = function(nums) {
6    let sum = nums[0]
7    let set = new Set([...nums])
8    for(let i = 1; i<nums.length; i++){
9        if(nums[i] === nums[i-1]+1){
10            sum+=nums[i]
11        }else{
12            break
13        }
14    }
15    
16    while(set.has(sum)){
17        sum++
18    }
19    return sum
20};