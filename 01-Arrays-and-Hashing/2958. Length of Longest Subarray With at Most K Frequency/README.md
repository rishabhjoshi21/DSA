<h2><a href="https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency">2958. Length of Longest Subarray With at Most K Frequency</a></h2>

<p>You are given an integer array <code>nums</code> and an integer <code>k</code>.</p>

<p>The <strong>frequency</strong> of an element <code>x</code> is the number of times it occurs in an array.</p>

<p>An array is called <strong>good</strong> if the frequency of each element in this array is <strong>less than or equal</strong> to <code>k</code>.</p>

<p>Return <em>the length of the <strong>longest</strong> <strong>good</strong> subarray of</em> <code>nums</code><em>.</em></p>

<p>A <strong>subarray</strong> is a contiguous non-empty sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,1,2,3,1,2], k = 2
<strong>Output:</strong> 6
<strong>Explanation:</strong> The longest possible good subarray is [1,2,3,1,2,3] since the values 1, 2, and 3 occur at most twice in this subarray. Note that the subarrays [2,3,1,2,3,1] and [3,1,2,3,1,2] are also good.
It can be shown that there are no good subarrays with length more than 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,2,1,2,1,2], k = 1
<strong>Output:</strong> 2
<strong>Explanation:</strong> The longest possible good subarray is [1,2] since the values 1 and 2 occur at most once in this subarray. Note that the subarray [2,1] is also good.
It can be shown that there are no good subarrays with length more than 2.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [5,5,5,5,5,5,5], k = 4
<strong>Output:</strong> 4
<strong>Explanation:</strong> The longest possible good subarray is [5,5,5,5] since the value 5 occurs 4 times in this subarray.
It can be shown that there are no good subarrays with length more than 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= nums.length</code></li>
</ul>


---

# 🛍️ Length-of-Longest-Subarray-With-at-Most-K-Frequency | Explained

## Approach 1: Variable-Size Sliding Window with Hash Map

### Intuition
Imagine managing a popular venue with strict security policies. Groups of guests arrive in a fixed order (the `nums` array). The venue rule states that **no single distinct guest type/id can appear more than $K$ times simultaneously** inside the room. 

As guests arrive at the entrance (`right` pointer), you record their presence in a tally counter (`Map`). If adding a guest causes their specific group count to exceed $K$, you must hold entry at the front and start escorting guests out through the exit door (`left` pointer) in the exact order they entered until the overrepresented group's count drops back to $K$ or less. The goal is to track the maximum number of guests that were safely inside the room at any given time.

### Approach
1. **Initialize Control Variables:**
   - Use two pointers, `left` and `right`, both starting at index `0`, to define the boundaries of our current contiguous subarray window `[left, right]`.
   - Use a hash map (`map`) to store frequency counts of elements inside the active window.
   - Use `maxWindow` to record the maximum valid subarray length found across the iteration.

2. **Expand the Window (`right` pointer):**
   - Iterate `right` from `0` to `nums.length - 1`.
   - Increment the frequency count of `nums[right]` inside the `map`.

3. **Shrink the Window on Constraint Violation (`left` pointer):**
   - Check if the frequency of `nums[right]` exceeds `k`.
   - While `map.get(nums[right]) > k`, decrement the frequency of `nums[left]` in `map` and increment `left`. This contracts the left side of the window until `nums[right]` is no longer invalid.

4. **Update Maximum Length:**
   - At each valid state, calculate the current window length `(right - left) + 1` and update `maxWindow` if the current length is greater.

5. **Return Result:**
   - Return `maxWindow` after iterating through all elements.

---

### Detailed Code Analysis

```javascript
var maxSubarrayLength = function (nums, k) {
    let left = 0;
    let right = 0;
    const map = new Map();
    let maxWindow = 0
```
- **Lines 7–10:** Initialize two pointers, `left` and `right`, set to `0`. A JavaScript `Map` object is instantiated to dynamically store key-value pairs (`element -> frequency`). `maxWindow` is initialized to `0` to keep track of the maximum valid window length observed.

```javascript
    while (right < nums.length) {
        map.set(nums[right], (map.get(nums[right]) || 0) + 1)
```
- **Lines 11–12:** The outer loop expands the window by moving `right` across the array. Line 12 retrieves the current count of `nums[right]` (defaulting to `0` if unseen) and increments it by `1` before setting it back into `map`.

```javascript
        while (left < right && map.get(nums[right]) > k) {
            map.set(nums[left], map.get(nums[left]) - 1)
            left++
        }
```
- **Lines 13–16:** The inner `while` loop checks whether the newly added element `nums[right]` breaks the rule (`frequency > k`). If violated, the window shrinks from the left:
  - `map.get(nums[left]) - 1` updates the frequency of the element at the `left` boundary.
  - `left++` moves the left boundary forward.
  - This process continues until `nums[right]` has a frequency $\le k$.

```javascript
        maxWindow = Math.max(maxWindow, (right - left) + 1)
        right++
    }
    return maxWindow
};
```
- **Lines 17–20:** Once the window is guaranteed to be valid, `(right - left) + 1` evaluates the size of the current contiguous subarray. `maxWindow` stores the largest size seen so far. Finally, `right` increments to evaluate the next element. Line 20 returns `maxWindow`.

---

### Code

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
    let left = 0;
    let right = 0;
    const map = new Map();
    let maxWindow = 0;

    while (right < nums.length) {
        map.set(nums[right], (map.get(nums[right]) || 0) + 1);

        while (left < right && map.get(nums[right]) > k) {
            map.set(nums[left], map.get(nums[left]) - 1);
            left++;
        }

        maxWindow = Math.max(maxWindow, (right - left) + 1);
        right++;
    }

    return maxWindow;
};
```

---

### Complexity

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of elements in `nums`. Although there is a nested `while` loop, both `left` and `right` pointers traverse the array at most once. Each element is added to the hash map once and removed at most once. Thus, the amortized time complexity per element is $\mathcal{O}(1)$.
- **Space Complexity:** $\mathcal{O}(U)$, where $U$ is the number of distinct elements in `nums` stored in the `Map`. In the worst-case scenario where all elements are unique, space complexity scales to $\mathcal{O}(N)$.

---

## 🌐 Real-World Scenarios & Examples

### Scenario 1: API Rate Limiting & Dynamic Throttling
* **Context:** An API Gateway processes incoming HTTP requests in a stream. To prevent DDoS attacks or fair-use violations, no single IP address or User ID can make more than $K$ requests within a continuous operational sequence.
* **Application:** The gateway tracks the longest sequence of contiguous incoming requests it can process without triggering a temporary ban or rate-limit throttle on any specific user.

### Scenario 2: E-Commerce Ad Carousel Diversity
* **Context:** An e-commerce platform displays a continuous horizontal carousel of sponsored products. To prevent user fatigue, the platform enforces a diversity constraint: no single brand ID can appear more than $K$ times in any visible sequence.
* **Application:** The sliding window algorithm determines the longest valid sub-sequence of available candidate products that can be displayed continuously without breaking brand frequency rules.

### Scenario 3: Audio/Video Streaming Buffer Smoothness
* **Context:** A streaming engine buffers packets of multimedia data. If a particular frame type or quality level (e.g., high-bitrate I-frames) appears more than $K$ times in a short buffer window, memory allocation spikes.
* **Application:** The system identifies the longest playable contiguous stream of frames while guaranteeing resource constraints ($K$ maximum occurrences per frame type) are maintained.

---

## 🕵️‍♂️ Follow-up Questions

### 1. Can we optimize the space complexity if the range of values in `nums` is known?
**Answer:** Yes. If the elements in `nums` fall within a small, bounded numerical range (e.g., $1 \le nums[i] \le 10^5$), replacing the `Map` object with a fixed-size `Int32Array` or standard array indexed by `nums[i]` reduces overhead, avoids JS object lookup penalties, and improves cache locality.

### 2. Is it possible to optimize the algorithm to run without shrinking the window size?
**Answer:** Yes. Instead of shrinking `left` inside a inner `while` loop, we can keep the window size non-decreasing. If adding `nums[right]` violates the condition, we simply shift `left` forward by $1$ step once (maintaining the maximum window size reached so far) without re-evaluating smaller windows. At the end of the array, the answer is simply `right - left`.