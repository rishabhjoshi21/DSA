<h2><a href="https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum">2996. Smallest Missing Integer Greater Than Sequential Prefix Sum</a></h2>

<p>You are given a <strong>0-indexed</strong> array of integers <code>nums</code>.</p>

<p>A prefix <code>nums[0..i]</code> is <strong>sequential</strong> if, for all <code>1 &lt;= j &lt;= i</code>, <code>nums[j] = nums[j - 1] + 1</code>. In particular, the prefix consisting only of <code>nums[0]</code> is <strong>sequential</strong>.</p>

<p>Return <em>the <strong>smallest</strong> integer</em> <code>x</code> <em>missing from</em> <code>nums</code> <em>such that</em> <code>x</code> <em>is greater than or equal to the sum of the <strong>longest</strong> sequential prefix.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,2,5]
<strong>Output:</strong> 6
<strong>Explanation:</strong> The longest sequential prefix of nums is [1,2,3] with a sum of 6. 6 is not in the array, therefore 6 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,4,5,1,12,14,13]
<strong>Output:</strong> 15
<strong>Explanation:</strong> The longest sequential prefix of nums is [3,4,5] with a sum of 12. 12, 13, and 14 belong to the array while 15 does not. Therefore 15 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 50</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 50</code></li>
</ul>


---

# 🛍️ Smallest-Missing-Integer-Greater-Than-Sequential-Prefix-Sum | Explained

## Approach 1: Sequential Prefix Sum with Hash Set Lookup

### Intuition
Imagine you are managing an automated ticket allocation system. First, you calculate the combined metric (score/weight) of an initial unbroken streak of consecutive customer transactions starting from the very first event. Once you compute this baseline sum, you need to assign a unique priority status code starting at this baseline value. However, status codes that already exist in your system cannot be reused. You increment your baseline value step-by-step until you hit the smallest status code that is currently unassigned.

This solution works by breaking the problem into two distinct phases:
1. **Contiguous Prefix Summation:** Iterating through the array starting at index 0 to calculate the sum of the longest strictly sequential prefix (where each element is exactly `1` greater than the preceding element).
2. **First Missing Value Lookup:** Utilizing a Hash Set for $O(1)$ existence checks, incrementing the target sum until a value is found that does not exist in the original array.

---

### Approach
1. **Initialize Baseline:** Set `sum` to the value of `nums[0]`, representing the start of the sequential prefix.
2. **Build Hash Set:** Construct a `Set` from `nums` to enable $O(1)$ time complexity checks when searching for missing integers.
3. **Compute Sequential Prefix Sum:**
   - Loop through `nums` starting at index `1`.
   - Check if `nums[i] === nums[i - 1] + 1`.
   - If true, add `nums[i]` to `sum`.
   - If false, break the loop immediately since the sequential prefix condition has been broken.
4. **Find Smallest Missing Integer:**
   - Enter a `while` loop that checks whether `sum` exists in the Hash Set.
   - Increment `sum` by `1` during each iteration until `set.has(sum)` returns `false`.
5. **Return Result:** Return `sum`.

---

### Detailed Code Analysis

* **Line 6 (`let sum = nums[0]`):**  
  Initializes `sum` with the first element of `nums`. The sequential prefix must start at index `0`, making `nums[0]` the mandatory starting term of the prefix sum.

* **Line 7 (`let set = new Set([...nums])`):**  
  Spreads `nums` into an array and passes it to the `Set` constructor to create a Hash Set. This yields $O(1)$ average time complexity for set membership checks (`has()`) later in the algorithm.

* **Lines 8–14 (`for(let i = 1; i < nums.length; i++) { ... }`):**  
  Iterates through `nums` starting from index `1`:
  * **Line 9 (`if (nums[i] === nums[i - 1] + 1)`):** Validates whether the current element continues the strict sequential increment sequence ($\text{element}_i = \text{element}_{i-1} + 1$).
  * **Line 10 (`sum += nums[i]`):** Adds `nums[i]` to `sum` if the sequential condition holds.
  * **Line 12 (`break`):** Halts the loop as soon as the sequence breaks, ensuring only the continuous sequential *prefix* starting at index `0` is included in `sum`.

* **Lines 16–18 (`while(set.has(sum)) { sum++ }`):**  
  Checks if `sum` is present in `set`. If it exists, `sum` cannot be the answer, so it increments `sum` by `1`. This repeats until `sum` is a value not present in `nums`.

* **Line 19 (`return sum`):**  
  Returns the computed smallest missing integer greater than or equal to the sequential prefix sum.

---

### Code

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    let sum = nums[0]
    let set = new Set([...nums])
    for(let i = 1; i < nums.length; i++){
        if(nums[i] === nums[i-1] + 1){
            sum += nums[i]
        } else {
            break
        }
    }
    
    while(set.has(sum)){
        sum++
    }
    return sum
};
```

---

### Complexity

- **Time Complexity:** $\mathcal{O}(N)$  
  - Creating the `Set` takes $\mathcal{O}(N)$ time, where $N$ is the number of elements in `nums`.
  - The single `for` loop iterates at most $N - 1$ times, taking $\mathcal{O}(N)$ time.
  - The `while` loop checks membership in the `Set` in $\mathcal{O}(1)$ time. Since there are at most $N$ unique numbers in the array, the `while` loop can increment `sum` at most $N$ times before finding a missing number.
  - Total Time Complexity: $\mathcal{O}(N) + \mathcal{O}(N) + \mathcal{O}(N) = \mathcal{O}(N)$.

- **Space Complexity:** $\mathcal{O}(N)$  
  - Constructing the `Set` requires $\mathcal{O}(N)$ auxiliary space to store unique elements of `nums`.

---

## 🌐 Real-World Scenarios & Examples

### Scenario 1: Financial Consecutive Order Batching & Audit Trail Allocation
* **Context:** A high-frequency trading platform processes batched transaction logs. Incoming trade logs receive contiguous batch sequence numbers starting at index 0 (e.g., batch `[101, 102, 103]`).
* **Use Case:** The system needs to calculate the aggregate weight/risk sum of the uninterrupted continuous sequence starting from batch zero. Afterwards, it must assign a new tracking ID for an audit record. The generated tracking ID must be at least as large as the total aggregate risk sum, but it cannot duplicate any existing transaction ID currently stored in active memory.
* **Example:**  
  Given active transaction IDs: `nums = [3, 4, 5, 1, 12]`  
  1. Uninterrupted sequence from start: `3 -> 4 -> 5` (Sum = $3 + 4 + 5 = 12$).
  2. Initial proposed audit ID = `12`.
  3. Look up `12` in active memory: present (`nums` contains `12`).
  4. Increment proposed ID to `13`.
  5. Look up `13` in active memory: missing.
  6. **Assigned Audit ID:** `13`.

### Scenario 2: Gaming Loyalty Leaderboard & Rank Tier Calculation
* **Context:** In a competitive multiplayer game, players accumulate daily login streak bonuses represented sequentially.
* **Use Case:** To calculate a player's starting score modifier, the system sums the player's unbroken initial streak values. Next, it attempts to reward the player with a cosmetic tier badge ID corresponding to that score. If that tier badge ID is already unlocked/owned in their inventory list, the system iterates upward to award the next closest unassigned cosmetic badge ID.
* **Example:**  
  Given player inventory item IDs: `nums = [1, 2, 3, 2, 6, 7]`  
  1. Sequential streak from day 1: `1 -> 2 -> 3` (Sum = $1 + 2 + 3 = 6$).
  2. Check target badge ID `6`: present in inventory (`nums` contains `6`).
  3. Increment target badge ID to `7`: present in inventory (`nums` contains `7`).
  4. Increment target badge ID to `8`: missing from inventory.
  5. **Awarded Badge ID:** `8`.

---

## 🕵️‍♂️ Follow-up Questions

### 1. How can we optimize space complexity to $\mathcal{O}(1)$ auxiliary space?
**Answer:**  
Instead of creating a `Set`, we can perform the prefix sum loop to find `sum`, and then sort the array in-place ($\mathcal{O}(N \log N)$ time) or perform linear searches ($\mathcal{O}(N^2)$ time). Alternatively, if modifying the array is allowed, we can sort `nums` after calculating `sum`. Once sorted, we iterate through the array starting from the elements greater than or equal to `sum`, incrementing `sum` whenever `sum === nums[i]`. This reduces auxiliary space complexity to $\mathcal{O}(1)$ (or $\mathcal{O}(\log N)$ space depending on the sorting implementation), trading off optimal time complexity.

### 2. What edge cases should be considered for this problem?
**Answer:**  
1. **Single-Element Array (`nums = [5]`):** The `for` loop does not execute. `sum` starts at `5`. The `while` loop finds `5` in the set and increments `sum` to `6`. Correct response is `6`.
2. **No Sequential Extension (`nums = [4, 2, 3]`):** The condition `nums[1] === nums[0] + 1` fails immediately ($2 \neq 5$). `sum` remains `4`. The `while` loop increments `sum` if `4` is present in `nums`.
3. **All Sequential Elements (`nums = [1, 2, 3, 4]`):** Sequential sum $= 10$. Since $10$ is not present in `nums`, the `while` loop terminates immediately, returning `10`.