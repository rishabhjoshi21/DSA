<h2><a href="https://leetcode.com/problems/find-pivot-index">724. Find Pivot Index</a></h2>

<p>Given an array of integers <code>nums</code>, calculate the <strong>pivot index</strong> of this array.</p>

<p>The <strong>pivot index</strong> is the index where the sum of all the numbers <strong>strictly</strong> to the left of the index is equal to the sum of all the numbers <strong>strictly</strong> to the index's right.</p>

<p>If the index is on the left edge of the array, then the left sum is <code>0</code> because there are no elements to the left. This also applies to the right edge of the array.</p>

<p>Return <em>the <strong>leftmost pivot index</strong></em>. If no such index exists, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,7,3,6,5,6]
<strong>Output:</strong> 3
<strong>Explanation:</strong>
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3]
<strong>Output:</strong> -1
<strong>Explanation:</strong>
There is no index that satisfies the conditions in the problem statement.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [2,1,-1]
<strong>Output:</strong> 0
<strong>Explanation:</strong>
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Note:</strong> This question is the same as&nbsp;1991:&nbsp;<a href="https://leetcode.com/problems/find-the-middle-index-in-array/" target="_blank">https://leetcode.com/problems/find-the-middle-index-in-array/</a></p>


---

# 🛍️ Find-Pivot-Index | Explained

## Approach 1: Optimized Single-Pass Solution
### Intuition
This approach works by first calculating the total sum of the input array. Then, it iterates through the array, maintaining a running sum of the elements to the left of the current index. By subtracting the current element and the left sum from the total sum, it calculates the sum of the elements to the right of the current index. If the left sum equals the right sum, the current index is the pivot index.

### Approach
The algorithm can be broken down into two main steps:
1. Calculate the total sum of the input array.
2. Iterate through the array to find the pivot index.

### Detailed Code Analysis
Let's break down the code line by line:
- `let total = 0;` initializes a variable to store the total sum of the input array.
- The first `for` loop calculates the total sum by iterating through the input array and adding each element to the `total` variable.
- `let left = 0;` initializes a variable to store the sum of the elements to the left of the current index.
- The second `for` loop iterates through the input array to find the pivot index. For each index `i`, it calculates the sum of the elements to the right of the current index using `let right = total - left - nums[i];`.
- The `if` statement checks if the left sum equals the right sum. If they are equal, the function returns the current index `i` as the pivot index.
- If the loop completes without finding a pivot index, the function returns `-1`.

### Code
```javascript
let total = 0;
for (let num of nums) {
    total += num;
}
let left = 0;
for (let i = 0; i < nums.length; i++) {
    let right = total - left - nums[i];
    if (left === right) {
        return i;
    }
    left += nums[i];
}
return -1;
```
### Complexity
- **Time:** The time complexity is O(n), where n is the number of elements in the input array. This is because the algorithm iterates through the array twice: once to calculate the total sum and once to find the pivot index.
- **Space:** The space complexity is O(1), as the algorithm only uses a constant amount of space to store the total sum, left sum, and current index.

## Real-World Scenarios & Examples
The concept of a pivot index can be applied to various real-world scenarios, such as:
- **Balanced scales:** Imagine a set of scales with weights on either side. The pivot index represents the point at which the scales are balanced, with the sum of the weights on the left side equal to the sum of the weights on the right side.
- **Financial analysis:** In financial analysis, the pivot index can be used to identify a point in time where the cumulative profits or losses of a company or investment are equal to the cumulative profits or losses of another company or investment.
- **Data analysis:** In data analysis, the pivot index can be used to identify a point in a dataset where the cumulative sum of a particular metric (e.g., sales, temperature, etc.) is equal to the cumulative sum of the same metric for the remaining data points. For example, if we have a dataset of daily sales for a company, the pivot index could represent the day where the cumulative sales for the first half of the year are equal to the cumulative sales for the second half of the year. 

Example:
```javascript
let nums = [1, 7, 3, 6, 5, 6];
console.log(pivotIndex(nums));  // Output: 3
```
In this example, the pivot index is 3, because the sum of the elements to the left of index 3 (1 + 7 + 3 = 11) is equal to the sum of the elements to the right of index 3 (5 + 6 = 11).