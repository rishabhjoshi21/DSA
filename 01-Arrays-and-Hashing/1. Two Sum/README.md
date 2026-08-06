<h2><a href="https://leetcode.com/problems/two-sum">1. Two Sum</a></h2>

<p>You are given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>

<p>You can return the answer in any order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
	<li><strong>Only one valid answer exists.</strong></li>
</ul>

<p>&nbsp;</p>
<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?

---

# 🛍️ Two-Sum | Explained

## Approach 1: One-Pass Hash Map
### Intuition
Imagine you are shopping at a store with a gift card worth a specific `target` amount, and you want to buy exactly two items that use up the full balance. Instead of taking the first item and walking through every other aisle in the store to compare it against every single other item (a brute-force approach), you can do something much smarter:

As you walk down an aisle, you pick up an item worth `nums[i]`. You instantly calculate its missing piece: `complement = target - nums[i]`. You then check your personal notebook (our Hash Map). 
- If the required `complement` is already written in your notebook, you are done! You retrieve the index where that item was found and pair it with your current position `i`.
- If it isn't in your notebook, you write down the current item's value and its index (`nums[i] -> i`), put it in your basket, and keep moving forward. 

Because looking up an entry in a hash map takes constant time on average, this allows us to solve the problem in a single pass.

### Algorithm Visualized
```mermaid
flowchart TD
    A[Start: Iterate i from 0 to nums.length - 1] --> B[Calculate complement = target - nums[i]]
    B --> C{map.has(complement)?}
    C -- Yes --> D[Found Pair! Return [map.get(complement), i]]
    C -- No --> E[Store map.set(nums[i], i)]
    E --> F[Increment i]
    F --> G{i < nums.length?}
    G -- Yes --> B
    G -- No --> H[Return [] - No solution found]
```

### Approach
1. **Instantiate Space:** Create an empty ES6 `Map` object named `map` to store array values as keys and their corresponding array indices as values (`value => index`).
2. **Iterate:** Loop through the `nums` array element-by-element using a index-based `for` loop.
3. **Calculate Complement:** At each index `i`, derive the exact value needed to reach `target` by computing `complement = target - nums[i]`.
4. **Lookup:** Perform a constant-time lookup using `map.has(complement)` to check if the complement has been encountered earlier in the iteration.
5. **Evaluate Match:**
   - **Match Found:** Return an array containing the cached index `map.get(complement)` and the current index `i`.
   - **No Match:** Register the current value and index into the map via `map.set(nums[i], i)` so it becomes available for future elements.
6. **Fallback:** If the loop terminates without finding a complementary pair, return an empty array `[]`.

### Detailed Code Analysis

Here is the line-by-line breakdown of the JavaScript implementation:

* **Line 6:** `var twoSum = function(nums, target) {`
  Defines the function accepting the input array `nums` and integer `target`.
* **Line 7:** `const map = new Map()`
  Initializes a JavaScript `Map`. A standard object (`{}`) could also work, but `Map` is preferable here because it avoids prototype key collisions, handles non-string keys natively, and offers optimized performance for frequent insertions and key checks (`.has()` and `.get()`).
* **Line 8:** `for (let i = 0; i < nums.length; i++) {`
  Establishes a standard standard `for` loop starting at index `0` up to `nums.length - 1`.
* **Line 9:** `const complement = target - nums[i];`
  Calculates the required matching value. For instance, if `target = 9` and `nums[i] = 2`, `complement` evaluates to `7`.
* **Line 10–12:** 
  ```javascript
  if (map.has(complement)) {
      return [map.get(complement), i];
  }
  ```
  `map.has(complement)` queries the map in $O(1)$ average time complexity. If `true`, `map.get(complement)` fetches the index of the previously stored matching value. We return both indices immediately in array format.
* **Line 13:** `map.set(nums[i], i);`
  If the complement was not present, we insert the current element as the key and its index as the value.
* **Line 16:** `return [];`
  Acts as a defensive guard clause returning an empty array if no valid pair sums to `target`.

### Code
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    // Return an empty array if no solution is found
    return [];
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$
  Where $N$ is the number of elements in the `nums` array. We iterate through the array at most once. Inside the loop, hash table insertion (`.set()`) and lookup (`.has()`, `.get()`) take $\mathcal{O}(1)$ average time. Thus, the total time complexity is linear.
- **Space Complexity:** $\mathcal{O}(N)$
  In the worst-case scenario (e.g., the matching pair is at the very end of the array, or no solution exists), we will insert up to $N - 1$ elements into the `Map`. Thus, additional memory scales linearly with input size.

---

## 🕵️‍♂️ Follow-up Questions

### 1. How would you solve this problem if the input array `nums` was guaranteed to be sorted in ascending order?
If the array is already sorted, we can optimize space complexity to $\mathcal{O}(1)$ using a **Two-Pointer Approach**:
- Place a `left` pointer at the start (`0`) and a `right` pointer at the end (`nums.length - 1`).
- Compute `sum = nums[left] + nums[right]`.
- If `sum === target`, return `[left, right]`.
- If `sum < target`, increment `left++` (to increase the total sum).
- If `sum > target`, decrement `right--` (to decrease the total sum).
- **Time Complexity:** $\mathcal{O}(N)$, **Space Complexity:** $\mathcal{O}(1)$.

### 2. Can we use the Two-Pointer approach on an unsorted array by sorting it first?
Sorting an unsorted array takes $\mathcal{O}(N \log N)$ time. Additionally, sorting alters the original indices of the elements, requiring us to store element-index tuples prior to sorting. Since the Hash Map approach achieves a faster $\mathcal{O}(N)$ time complexity, sorting first is suboptimal when returning indices, though useful if auxiliary space is strictly restricted.