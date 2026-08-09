<h2><a href="https://leetcode.com/problems/max-number-of-k-sum-pairs">1679. Max Number Of K Sum Pairs</a></h2>

<p>You are given an integer array <code>nums</code> and an integer <code>k</code>.</p>

<p>In one operation, you can pick two numbers from the array whose sum equals <code>k</code> and remove them from the array.</p>

<p>Return <em>the maximum number of operations you can perform on the array</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4], k = 5
<strong>Output:</strong> 2
<strong>Explanation:</strong> Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,1,3,4,3], k = 6
<strong>Output:</strong> 1
<strong>Explanation:</strong> Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


---

# 🛍️ Max-Number-Of-K-Sum-Pairs | Explained

## Approach 1: Sorting and Two-Pointer Technique

### Intuition
Imagine organizing a group of people by height to find pairs whose combined heights equal a target sum $k$. If you line everyone up from shortest to tallest, you can check the shortest person and the tallest person together. If their sum is too large, the tallest person cannot pair with anyone current or taller, so you check the next tallest person. If their sum is too small, the shortest person cannot pair with anyone current or shorter, so you move to the next shortest. When you find a match, both leave the line, and you count the pair.

Sorting the array transforms an unsorted search space into a predictable monotonic sequence, allowing us to narrow down potential pairs efficiently using two converging pointers from both ends.

### Approach
1. **Sort the Array:** Sort `nums` in ascending order so that smaller elements are at the beginning and larger elements are at the end.
2. **Initialize Pointers:** Set `left` pointer to index `0` and `right` pointer to index `nums.length - 1`. Initialize `count` to `0`.
3. **Traverse with Two Pointers:** Iterate while `left < right`:
   - Calculate the sum of `nums[left] + nums[right]`.
   - **Sum > k:** The current sum is too high. To reduce the sum, decrement `right` to pick a smaller value.
   - **Sum < k:** The current sum is too low. To increase the sum, increment `left` to pick a larger value.
   - **Sum === k:** A valid pair is found! Increment `count`, then advance both pointers (`left++` and `right--`) to consume both elements so they cannot be reused.
4. **Return Result:** Return `count`.

### Detailed Code Analysis
- `nums.sort((a, b) => a - b);`: JavaScript's `Array.prototype.sort()` sorts lexicographically by default, so we pass a comparator `(a, b) => a - b` to ensure proper numerical ascending sort.
- `let left = 0`, `let right = nums.length - 1`: Sets up the two pointers at opposite ends of the sorted array.
- `while (left < right)`: Ensures pointers do not cross or evaluate the same index twice (since each element can only belong to one pair).
- `if (nums[left] + nums[right] > k)`: Triggers when the combined sum exceeds $k$. Decrementing `right` moves us to a smaller value.
- `else if (nums[left] + nums[right] < k)`: Triggers when the combined sum is under $k$. Incrementing `left` moves us to a larger value.
- `else { count++; left++; right--; }`: Executes when an exact target pair is identified. `count` increments, and both elements are discarded from future matching by adjusting both boundaries inward.

### Code
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
    nums.sort((a, b) => a - b);

    let left = 0;
    let right = nums.length - 1;
    let count = 0;

    while (left < right) {
        if (nums[left] + nums[right] > k) {
            right--;
        } else if (nums[left] + nums[right] < k) {
            left++;
        } else {
            count++;
            left++;
            right--;
        }
    }

    return count;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N \log N)$ — Sorting the array dominates the time complexity, taking $\mathcal{O}(N \log N)$ time. The two-pointer traversal takes linear time $\mathcal{O}(N)$. Overall time is $\mathcal{O}(N \log N)$.
- **Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(\log N)$ — Memory usage depends on the JavaScript engine implementation of sorting (Timsort usually requires $\mathcal{O}(N)$ or $\mathcal{O}(\log N)$ auxiliary space). No extra external data structures are allocated.

---

## Approach 2: Hash Map (Frequency Counter / Single Pass)

### Intuition
Think of a coat check counter. As guests arrive with a coat of value $x$, you check if a coat of value $k - x$ (the complement needed to reach $k$) is already sitting on the holding shelf. If it is available on the shelf, you grab it, form a pair, remove that complement from the shelf, and increment your paired count. If the complement isn't on the shelf, you place the current coat on the shelf so a future guest can match with it.

This approach trades auxiliary memory for speed by replacing sorting with an $\mathcal{O}(1)$ lookup data structure (`Map`).

### Approach
1. **Initialize Data Structures:** Create a JavaScript `Map` instance to store available elements and their frequency counts. Initialize `count = 0`.
2. **Iterate Through Array:** For each number `nums[i]` in `nums`:
   - Compute the complement `elem = k - nums[i]`.
   - **Check Map for Complement:** If `map` contains `elem` with a frequency greater than `0`:
     - A valid matching pair is found.
     - Increment `count`.
     - Decrement the count of `elem` in `map` by `1` to consume it.
   - **Otherwise:** The complement is not available. Store or increment the frequency of the current element `nums[i]` in `map` so it can be matched by subsequent elements.
3. **Return Result:** Return `count`.

### Detailed Code Analysis
- `const map = new Map();`: Initializes an empty hash map to store frequencies of seen numbers.
- `for (let i = 0; i < nums.length; i++)`: Iterates sequentially through `nums`.
- `const elem = k - nums[i];`: Calculates the exact numerical value needed to sum up to `k`.
- `if (map.has(elem) && map.get(elem) > 0)`: Checks if the target complement exists in our frequency table and is still available (frequency $> 0$).
- `map.set(elem, map.get(elem) - 1)`: Decrements the complement's available count, simulating the removal/use of that element in a pair.
- `else { map.set(nums[i], (map.get(nums[i]) || 0) + 1); }`: If no complement exists, registers the current number in the hash map. `(map.get(nums[i]) || 0) + 1` safely handles initialization for newly seen numbers.

### Code
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
    const map = new Map();
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        const elem = k - nums[i];
        if (map.has(elem) && map.get(elem) > 0) {
            count++;
            map.set(elem, map.get(elem) - 1);
        } else {
            map.set(nums[i], (map.get(nums[i]) || 0) + 1);
        }
    }

    return count;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$ — We perform a single pass over the array of size $N$. Map lookup (`has`), retrieval (`get`), and insertion (`set`) operations run in amortized $\mathcal{O}(1)$ time.
- **Space Complexity:** $\mathcal{O}(N)$ — In the worst-case scenario (e.g., no pairs match), the `Map` stores up to $N$ unique elements.

---

## 🌐 Real-World Scenarios & Examples

### 1. Order Matching in E-Commerce & Financial Exchanges
* **Scenario:** An e-commerce platform offers a promotional bundle: buy two items whose total price equals exactly $k$ (e.g., a $100 gift card bundle). Alternatively, a financial platform matches buy and sell orders of fixed block sizes to minimize transaction fees.
* **Example:**
  - Available item prices: `[30, 70, 50, 50, 20, 80]`
  - Target total $k = 100$
  - The Hash Map algorithm checks prices sequentially:
    - `30` looks for `70` (not found $\rightarrow$ store `30`)
    - `70` looks for `30` (found! match formed `(30, 70)`, count = 1)
    - `50` looks for `50` (not found $\rightarrow$ store `50`)
    - `50` looks for `50` (found! match formed `(50, 50)`, count = 2)
  - Output: 2 distinct valid bundles.

### 2. Supply Chain Container Allocation
* **Scenario:** Freight containers have a maximum combined weight capacity $k$. Cargo packages must be paired together to maximize space utilization without exceeding limits or underutilizing weight limits.
* **Example:**
  - Package weights: `[1, 2, 3, 4, 3]`, capacity constraint $k = 5$.
  - Pairs formed: `(1, 4)` and `(2, 3)`. Remaining package: `[3]`.
  - Max pairs loaded = `2`.

---

## 🕵️‍♂️ Follow-up Questions

### 1. What if the input array is already sorted?
* **Answer:** If the input array is pre-sorted, **Approach 1 (Two Pointers)** becomes optimal with $\mathcal{O}(N)$ time complexity and $\mathcal{O}(1)$ auxiliary space complexity, strictly outperforming the Hash Map approach in space efficiency.

### 2. How would you handle a streaming dataset where numbers arrive sequentially over time?
* **Answer:** **Approach 2 (Hash Map)** is natively suited for streaming data. As each number arrives from the stream, it can be immediately checked against the frequency map in $\mathcal{O}(1)$ time, making real-time matching possible without needing the entire dataset upfront.
