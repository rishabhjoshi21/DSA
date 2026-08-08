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
Imagine you are managing a moving window of $K$ consecutive items on a conveyor belt, and every item in your window must be unique. If a duplicate item arrives at the right end, your window becomes invalid. To fix this, you must continuously discard items from the left side of the window until the duplicate item is removed. 

Once your window reaches exactly length $K$ without any duplicate items, you record its sum. Then, to make room for the next element on the conveyor belt, you eject the leftmost element and slide the window forward.

Using a **Hash Set** gives us $\mathcal{O}(1)$ lookup time to immediately detect duplicates, while maintaining a running total (`totalSum`) allows us to calculate window sums in constant time without re-summing all $K$ elements.

### Algorithm Visualized

```mermaid
flowchart TD
    Start([Start: Loop right < nums.length]) --> DuplicateCheck{Set contains<br/>nums[right]?}
    
    DuplicateCheck -- Yes: Duplicate Detected --> ShrinkLeft[Remove nums[left] from Set<br/>Subtract nums[left] from totalSum<br/>left++]
    ShrinkLeft --> DuplicateCheck

    DuplicateCheck -- No: Unique Element --> Insert[Add nums[right] to Set<br/>Add nums[right] to totalSum]
    
    Insert --> LengthCheck{Window Length<br/>right - left + 1 == k?}
    
    LengthCheck -- Yes: Valid Subarray of Size K --> RecordMax[result = Math.max(result, totalSum)]
    RecordMax --> SlideLeft[Remove nums[left] from Set<br/>Subtract nums[left] from totalSum<br/>left++]
    SlideLeft --> IncrementRight[right++]
    
    LengthCheck -- No: Window Size < K --> IncrementRight
    
    IncrementRight --> Start
```

### Approach
1. **Initialize State Tracker & Pointers**: Maintain two pointers (`left` and `right`) to define the boundary of the sliding window. Use a `Set` to track the unique elements within the current window and a scalar variable `totalSum` to track the running sum of the current window.
2. **Expand Window (`right` pointer)**:
   - Before adding `nums[right]`, check if it already exists in the `Set`.
   - If it exists, repeatedly remove `nums[left]` from the `Set`, subtract `nums[left]` from `totalSum`, and increment `left` until `nums[right]` is no longer in the set.
3. **Include Current Element**: Add `nums[right]` to the `Set` and add its value to `totalSum`.
4. **Evaluate Window Condition**:
   - Check if the current window size (`right - left + 1`) equals $K$.
   - If it equals $K$, update `result` with `Math.max(result, totalSum)`.
   - Shrink the window from the left by one step (`totalSum -= nums[left]`, `set.delete(nums[left])`, `left++`) to prepare for the next iteration.
5. **Advance**: Increment `right` and repeat until the end of the array is reached.

### Detailed Code Analysis

Let's break down the logic execution block by block:

```javascript
1  /**
2   * @param {number[]} nums
3   * @param {number} k
4   * @return {number}
5   */
6  var maximumSubarraySum = function(nums, k) {
7      let left = 0;
8      let right = 0;
9      let totalSum = 0;
10     let result = 0;
11     let set = new Set();
```
* **Lines 7–11**: We initialize our pointers `left` and `right` at index `0`. `totalSum` tracks the sum of elements currently in the window, `result` holds the maximum sum found so far, and `set` keeps track of the distinct elements inside the `[left, right]` range.

```javascript
12     while(right < nums.length){
13         while(set.has(nums[right])){
14             totalSum -= nums[left];
15             set.delete(nums[left]);
16             left++;
17         }
```
* **Lines 12–17**: The outer loop drives the right pointer through the array. Line 13 handles **duplicate resolution**. If `nums[right]` is already in our window (tracked by `set`), we must contract the window from the left. Lines 14–16 subtract `nums[left]` from `totalSum`, remove `nums[left]` from the `set`, and increment `left`. This inner loop runs until `nums[right]` can be safely added without violating the uniqueness constraint.

```javascript
18         set.add(nums[right]);
19         totalSum += nums[right];
```
* **Lines 18–19**: Once all duplicates of `nums[right]` are evicted from the window, `nums[right]` is added to both the `set` and the running `totalSum`.

```javascript
20         if(right - left + 1 === k){
21             result = Math.max(totalSum, result);
22             totalSum -= nums[left];
23             set.delete(nums[left]);
24             left++;
25         }
26         right++;
27     }
28     return result;
29 };
```
* **Lines 20–25**: Check if the dynamic window length `right - left + 1` reaches $K$.
  * Line 21: Update `result` with the maximum sum encountered.
  * Lines 22–24: Since we only care about subarrays of *exact* length $K$, we manually pop the leftmost element out of the window (`totalSum -= nums[left]`, `set.delete(nums[left])`, `left++`) so that the next expansion of `right` keeps testing contiguous windows.
* **Line 26**: Move `right` to expand the window forward.
* **Line 28**: Returns `result`, which defaults to `0` if no valid contiguous subarray of length $K$ with distinct elements was found.

### Code

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function(nums, k) {
    let left = 0;
    let right = 0;
    let totalSum = 0;
    let result = 0;
    let set = new Set();

    while(right < nums.length){
        // Shrink window from the left until the duplicate element is removed
        while(set.has(nums[right])){
            totalSum -= nums[left];
            set.delete(nums[left]);
            left++;
        }
        
        // Add the current element to the set and running sum
        set.add(nums[right]);
        totalSum += nums[right];
        
        // If window size reaches exactly K, evaluate and slide left pointer
        if(right - left + 1 === k){
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

- **Time Complexity:** $\mathcal{O}(N)$
  Although there is a nested `while` loop (Lines 13–17), both `left` and `right` pointers traverse the array from index `0` to $N - 1$ at most once. Each element is added to the `Set` once and deleted from the `Set` at most once. Thus, operations inside the loops run in amortized $\mathcal{O}(1)$ time, yielding a total runtime of $\mathcal{O}(N)$.

- **Space Complexity:** $\mathcal{O}(\min(N, K))$
  The auxiliary space is dominated by the Hash Set. The set stores at most $K$ elements at any time because whenever the window length hits $K$, we immediately remove an element from the left. Thus, the space complexity is bounded by $\mathcal{O}(K)$ (or $\mathcal{O}(N)$ if $K \ge N$).

---

## 🕵️‍♂️ Follow-up Questions

### 1. How would you handle primitive integer overflow if this problem were implemented in C++ or Java?
In languages like C++ or Java, `nums[i]` can be up to $10^5$ and $K$ up to $10^5$. The maximum possible subarray sum is $10^5 \times 10^5 = 10^{10}$, which exceeds the $32$-bit signed integer limit ($\approx 2 \times 10^9$). To prevent integer overflow, `totalSum` and `result` must be declared as `long long` (C++) or `long` (Java). In JavaScript, standard numbers are IEEE 754 double-precision floats that represent integers safely up to $2^{53} - 1 \approx 9 \times 10^{15}$, so overflow is not an issue here.

### 2. Can we optimize the Hash Set overhead further if memory allocation is a concern?
Yes. Hash Set operations in standard JS engines carry a non-trivial memory and execution overhead due to hashing and object allocations. If the range of values in `nums` is bounded (e.g., $1 \le nums[i] \le 10^5$), we can replace `Set` with a fixed-size `Uint8Array` or boolean frequency array. Checking and updating an indexed typed array is significantly faster than using native set methods (`set.has`, `set.add`, `set.delete`).