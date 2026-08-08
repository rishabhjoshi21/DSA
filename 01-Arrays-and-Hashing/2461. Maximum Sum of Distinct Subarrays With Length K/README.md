<h2><a href="https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k">2461. Maximum Sum of Distinct Subarrays With Length K</a></h2>

<p>You are given an integer array <code>nums</code> and an integer <code>k</code>. Find the maximum subarray sum of all the subarrays of <code>nums</code> that meet the following conditions:</p>

<ul>
	<li>The length of the subarray is <code>k</code>, and</li>
	<li>All the elements of the subarray are <strong>distinct</strong>.</li>
</ul>

<p>Return <em>the maximum subarray sum of all the subarrays that meet the conditions</em><em>.</em> If no subarray meets the conditions, return <code>0</code>.</p>

<p><em>A <strong>subarray</strong> is a contiguous non-empty sequence of elements within an array.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,5,4,2,9,9,9], k = 3
<strong>Output:</strong> 15
<strong>Explanation:</strong> The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [4,4,4], k = 3
<strong>Output:</strong> 0
<strong>Explanation:</strong> The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


---

# 🛍️ Maximum-Sum-of-Distinct-Subarrays-With-Length-K | Explained

## Approach 1: Dynamic Sliding Window with Hash Set

### Intuition
Imagine you are managing a fixed-capacity display shelf that can hold exactly $k$ items at a time, and your goal is to maximize the total value of the items on display. However, there is a strict rule: **no duplicate items are allowed on the shelf**.

As new items arrive sequentially on a conveyor belt (`nums[right]`), you want to place them onto the shelf. If an incoming item is already on your shelf, you cannot accept it immediately. You must first remove items from the opposite end of the shelf (`nums[left]`), one by one, until the identical item is gone. Once the duplicate is cleared, you add the new item. Whenever your shelf reaches capacity $k$, you calculate the total value on display, record it if it is the highest sum seen so far, and then remove the oldest item from the shelf to keep room for future items.

### Approach
1. **Pointers & State Tracking**: Maintain a dynamic sliding window using two pointers, `left` and `right`. Track the sum of the current window using `totalSum`, store the maximum valid sum found so far in `result`, and use a JavaScript `Set` to enforce element uniqueness in $O(1)$ lookup time.
2. **Duplicate Resolution**: As `right` iterates through `nums`, check if `nums[right]` already exists in the set. If it does, shrink the window from the left by removing `nums[left]` from `totalSum` and `set`, and incrementing `left` until the duplicate is removed.
3. **Window Expansion**: Add `nums[right]` to `set` and add its value to `totalSum`.
4. **Window Shrinking & Result Update**: If the current window size (`right - left + 1`) equals $k$:
   - Update `result` with `Math.max(result, totalSum)`.
   - Remove `nums[left]` from `totalSum` and `set`, then increment `left` to shift the fixed window forward.
5. **Iteration**: Increment `right` to process the next element.

### Detailed Code Analysis

- **Lines 6–11: Initialization**
  ```javascript
  let left = 0;
  let right = 0;
  let totalSum = 0;
  let result = 0;
  const set = new Set();
  ```
  We initialize `left` and `right` to index `0` to track the bounds of our subarray. `totalSum` stores the sum of elements within `[left, right]`. `result` holds our global maximum sum for a valid subarray of length $k$. `set` allows $O(1)$ duplicate checking and management.

- **Lines 12–17: Main Loop & Duplicate Eviction**
  ```javascript
  while (right < nums.length) {
      while (set.has(nums[right])) {
          totalSum -= nums[left];
          set.delete(nums[left]);
          left++;
      }
  ```
  The outer loop iterates through the array via `right`. Before adding `nums[right]`, the inner `while` loop checks if `nums[right]` is already in `set`. If a duplicate is detected, `left` shifts rightward, shrinking the window, subtracting `nums[left]` from `totalSum`, and deleting `nums[left]` from `set` until `nums[right]` can be added uniquely.

- **Lines 18–19: Adding New Element**
  ```javascript
      set.add(nums[right]);
      totalSum += nums[right];
  ```
  Once uniqueness is guaranteed, `nums[right]` is added to both `set` and `totalSum`.

- **Lines 20–25: Target Length Handling**
  ```javascript
      if (right - left + 1 === k) {
          result = Math.max(totalSum, result);
          totalSum -= nums[left];
          set.delete(nums[left]);
          left++;
      }
  ```
  We check if our current window has reached the desired length $k$. If it has:
  1. We update `result` if `totalSum` is larger than the previously recorded `result`.
  2. Because the window cannot exceed length $k$, we immediately evict the leftmost element `nums[left]` from `totalSum` and `set`, and increment `left` to prepare for the next iteration.

- **Lines 26–29: Pointer Advancement & Return**
  ```javascript
      right++;
  }
  return result;
  ```
  We advance `right` to process the next incoming element. Once the outer loop completes, `result` holds the maximum sum of any distinct subarray of length $k$, which is returned.

### Code
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
    let left = 0;
    let right = 0;
    let totalSum = 0;
    let result = 0;
    const set = new Set();

    while (right < nums.length) {
        while (set.has(nums[right])) {
            totalSum -= nums[left];
            set.delete(nums[left]);
            left++;
        }
        set.add(nums[right]);
        totalSum += nums[right];

        if (right - left + 1 === k) {
            result = Math.max(totalSum, result);
            totalSum -= nums[left];
            set.delete(nums[left]);
            left++;
        }
        right++;
    }

    return result;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of elements in `nums`. Although there is a nested `while` loop, each element is inserted into and deleted from the `Set` at most once. The `left` and `right` pointers both travel from `0` to $N$ independently.
- **Space Complexity:** $\mathcal{O}(\min(N, k))$ auxiliary space. The `Set` stores at most $k$ elements at any point, as the window size is bounded by $k$.

---

## 🕵️‍♂️ Follow-up Questions

### 1. How would you optimize space if the values in `nums` were restricted to a small range (e.g., $1 \le \text{nums}[i] \le 10^5$)?
**Answer:** Instead of using a generic hash `Set`, we could use a fixed-size integer array or `Uint32Array` as a frequency map or index map. Checking and updating values in a contiguous array eliminates object allocation overhead and hash collisions, improving cache locality and performance in environments like V8.

### 2. Can we optimize duplicate handling to jump `left` directly instead of shrinking one element at a time?
**Answer:** Yes. Instead of storing elements in a `Set` and removing them one by one in a inner loop, we can store each element's most recent index in a Hash Map (`Map<number, number>`). When a duplicate `nums[right]` is seen at index `prevIdx`, if `prevIdx >= left`, we can instantly set `left = prevIdx + 1`. However, calculating `totalSum` in $O(1)$ during direct jumps requires either a prefix sum array or subtracting elements during the jump.