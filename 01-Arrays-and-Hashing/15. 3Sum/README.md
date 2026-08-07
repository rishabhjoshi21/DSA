<h2><a href="https://leetcode.com/problems/3sum">15. 3Sum</a></h2>

<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>

<p>Notice that the solution set must not contain duplicate triplets.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [-1,0,1,2,-1,-4]
<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]
<strong>Explanation:</strong> 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [0,1,1]
<strong>Output:</strong> []
<strong>Explanation:</strong> The only possible triplet does not sum up to 0.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [0,0,0]
<strong>Output:</strong> [[0,0,0]]
<strong>Explanation:</strong> The only possible triplet sums up to 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= nums.length &lt;= 3000</code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


---

# 🛍️ 3Sum | Explained

## Approach 1: Sorting and Two Pointers
### Intuition
Imagine you are at a marketplace trying to balance a scale using three different weights so that their combined total sum equals zero ($a + b + c = 0$). If the items are scattered randomly, finding three matching items requires checking every possible triplet combination—an inefficient $O(N^3)$ process.

However, if you first arrange all items in ascending numeric order on a long table, you can simplify the problem:
1. Pick one weight ($a$) starting from the left.
2. Search for the remaining two weights ($b$ and $c$) using two hands (pointers): one starting just to the right of $a$ (smallest available value) and the other at the far right end of the table (largest available value).
3. If the total sum is too negative, move your left hand rightward to pick a larger value. If the total sum is too positive, move your right hand leftward to pick a smaller value.

By sorting the array first, we transform a 3-variable problem into $N$ standard Two-Pointer search sub-problems, bypassing the need for nested triple loops.

### Algorithm Visualized

```mermaid
graph TD
    A[Start: Array Unsorted] --> B[Sort Array Ascending: nums.sort]
    B --> C[Initialize Result Array res = []]
    C --> D[Outer Loop: Iterate i from 0 to nums.length - 1]
    D --> E{i > 0 AND nums[i] == nums[i-1]?}
    E -- Yes: Skip Duplicate --> D
    E -- No --> F[Initialize Two Pointers: left = i + 1, right = nums.length - 1]
    F --> G{Is left < right?}
    G -- No --> D
    G -- Yes --> H[Calculate sum = nums[i] + nums[left] + nums[right]]
    H --> I{sum == 0?}
    I -- Yes --> J[Push [nums[i], nums[left], nums[right]] to res]
    J --> K[Advance left & right while skipping duplicates]
    K --> G
    I -- No: sum < 0 --> L[Increment left pointer]
    L --> G
    I -- No: sum > 0 --> M[Decrement right pointer]
    M --> G
    D -- Loop Finished --> N[Return res]
```

### Approach
1. **Sort the Input Array**: Sort `nums` in ascending order using JavaScript's native sort with a numeric comparator `(a, b) => a - b`.
2. **Iterate with Pivot Pointer (`i`)**: Loop through the array, treating `nums[i]` as the fixed first element of the triplet.
3. **Deduplicate Fixed Element**: If `nums[i]` is identical to `nums[i - 1]`, skip it using `continue` to avoid duplicate triplets in the result set.
4. **Initialize Two Pointers**: Place `left` at `i + 1` and `right` at `nums.length - 1`.
5. **Two-Pointer Search Loop**:
   - Compute `sum = nums[i] + nums[left] + nums[right]`.
   - **If `sum === 0`**: A valid triplet is found! Add `[nums[i], nums[left], nums[right]]` to `res`. Move `left` forward and `right` backward while skipping duplicate values for both pointers.
   - **If `sum < 0`**: The sum is too small. Increase `left` (`left++`) to get a larger value.
   - **If `sum > 0`**: The sum is too large. Decrease `right` (`right--`) to get a smaller value.
6. **Return Result**: Return the accumulated `res` array containing all unique triplets.

### Detailed Code Analysis

Let me break down the exact execution logic line-by-line:

```javascript
nums.sort((a, b) => a - b);
```
- **Why `(a, b) => a - b`?** In JavaScript, calling `nums.sort()` without a custom comparator sorts elements lexicographically (as strings). For example, `[-10, -3, 1, 2]` would be sorted incorrectly as `[-10, -3, 1, 2]`, but `[-1, -2]` would be sorted as `[-1, -2]` instead of `[-2, -1]`. Passing `(a, b) => a - b` guarantees numeric ascending order.

```javascript
const res = [];
```
- **Data Structure Choice**: An array to store the resulting unique triplet arrays.

```javascript
for (let i = 0; i < nums.length; i++) {
```
- **Outer Loop**: Iterates through each element, treating `nums[i]` as the anchor (the first number of the prospective triplet).

```javascript
    if (i > 0 && nums[i] === nums[i - 1]) {
        continue;
    }
```
- **Duplicate Skipping for Anchor**: Since the array is sorted, duplicate values sit adjacent to each other. If `nums[i]` matches `nums[i - 1]`, running the two-pointer search again would yield duplicate triplets. We check `i > 0` to ensure we don't index out of bounds on the first element.

```javascript
    let left = i + 1;
    let right = nums.length - 1;
```
- **Pointer Initialization**: `left` starts immediately to the right of our fixed index `i`, and `right` starts at the final element of the array.

```javascript
    while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        
        if (sum === 0) {
            res.push([nums[i], nums[left], nums[right]]);
            
            // Skip duplicates for left and right pointers
            while (left < right && nums[left] === nums[left + 1]) left++;
            while (left < right && nums[right] === nums[right - 1]) right--;
            
            left++;
            right--;
        } else if (sum < 0) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
```
- **Two-Pointer Traversal**: Inside the `while (left < right)` loop, we evaluate `sum`. 
- When `sum === 0`, we collect the triplet. To avoid duplicate answers, inner `while` loops skip matching adjacent numbers for both `left` and `right` pointers before performing the standard `left++` and `right--`.
- When `sum < 0`, moving `left` to the right increases `nums[left]`, pushing the `sum` closer to `0`.
- When `sum > 0`, moving `right` to the left decreases `nums[right]`, bringing the `sum` down toward `0`.

### Code

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Sort numbers in ascending numerical order
    nums.sort((a, b) => a - b);
    
    const res = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Early exit optimization: If the smallest number is > 0, 
        // no three positive numbers can sum to 0.
        if (nums[i] > 0) break;

        // Skip same numbers from left for the anchor pointer
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicate elements for left and right pointers
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return res;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N^2)$
  - Sorting the array takes $\mathcal{O}(N \log N)$ time using Timsort (V8 JavaScript engine standard).
  - The outer loop runs $N$ times. In each iteration, the inner `while` loop moves `left` and `right` pointers towards each other, scanning the remaining elements in $\mathcal{O}(N)$ overall across the loop.
  - Total Time: $\mathcal{O}(N \log N) + \mathcal{O}(N^2) = \mathcal{O}(N^2)$.

- **Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(N)$
  - Auxiliary space for two pointers and variables is $\mathcal{O}(1)$.
  - Depending on the JavaScript engine implementation of `.sort()`, Timsort requires $\mathcal{O}(N)$ temporary space overhead.
  - Ignoring output space consumed by `res`, auxiliary space complexity is $\mathcal{O}(N)$ in the worst-case due to sorting overhead.

---

## 🕵️‍♂️ Follow-up Questions (Optional)

1. **What if the array cannot be mutated (i.e., sorting in-place is disallowed)?**
   - **Answer:** You can create a shallow copy of the array using `[...nums].sort((a, b) => a - b)` which incurs $\mathcal{O}(N)$ extra space, or utilize a Hash Set approach (similar to 2Sum) which avoids sorting altogether at the cost of higher memory overhead ($\mathcal{O}(N)$ auxiliary space) and complex duplicate set handling.

2. **How would you extend this solution to solve 4Sum or general $k$-Sum problems?**
   - **Answer:** The pattern can be generalized recursively. For $k$-Sum, fix one pointer and recursively call $(k-1)$-Sum on the remaining subarray. Base case is $k = 2$, where you apply the Two-Pointer approach. The resulting time complexity will be $\mathcal{O}(N^{k-1})$.