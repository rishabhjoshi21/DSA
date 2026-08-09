1/**
2 * @param {number[]} height
3 * @return {number}
4 */
5var maxArea = function(height) {
6    let left = 0;
7    let right = height.length-1;
8    let max = 0
9    while(left < right){
10        let width = right -  left;
11        const minHeight = Math.min(height[left], height[right]);
12        
13        const currentMax = width * minHeight
14        if(currentMax> max) max = currentMax
15        if(height[left] > height[right]){
16            right--
17        }else{
18            left++
19        }
20    }
21    return max
22};