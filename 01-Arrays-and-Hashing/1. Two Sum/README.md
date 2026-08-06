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
Imagine you are at a coat-check counter at an event. You hold a ticket with a specific number (`nums[i]`) and need to find a partner whose ticket number, when added to yours, equals a total target sum (`target`). 

Instead of asking every person in line one by one (which would require scanning the whole line repeatedly), a receptionist keeps a logbook (`Map`). As each person arrives:
1. They calculate the ticket number they need to complete the pair (`complement = target - nums[i]`).
2. They check if that exact complement is already written down in the logbook.
3. If it is in the logbook, the pair is instantly found!
4. If not, they write their own ticket number and their current position in line into the logbook and let the next person step up.

By checking the logbook *before* writing down the current number, we ensure we find the matching pair in a single pass without matching an element with itself.

### Algorithm Visualized
```mermaid
graph TD
    Start([Start Loop: i = 0]) --> CalcComp[Calculate complement = target - nums[i]]
    CalcComp --> CheckMap{Is complement in map?}
    
    CheckMap -- Yes --> ReturnResult[Return map.get complement, i]
    CheckMap -- No --> AddToMap[Store map.set nums[i], i]
    
    AddToMap --> NextIter[i++]
    NextIter --> LoopCond{i < nums.length?}
    LoopCond -- Yes --> CalcComp
    LoopCond -- No --> End([End])
    ReturnResult --> End
```

### Approach
1. **Initialize a Hash Map**: Create a JavaScript `Map` instance to store array values as keys and their corresponding array indices as values.
2. **Single Pass Iteration**: Loop through the `nums` array from index `0` to `nums.length - 1`.
3. **Calculate Complement**: For each element `nums[i]`, compute `complement = target - nums[i]`.
4. **Lookup Complement**: Check if `complement` exists in the hash map using `map.has(complement)`.
   - **Found**: Return an array containing the complement's index stored in the map and the current index `i`: `[map.get(complement), i]`.
   - **Not Found**: Register the current element and its index into the map using `map.set(nums[i], i)`.
5. **Termination**: The problem guarantees exactly one valid solution, so the return statement inside the loop will always trigger.

### Detailed Code Analysis

Here is the step-by-step breakdown of the exact logic provided:

* **`const map = new Map()`**  
  We instantiate a native JavaScript `Map` object. A hash map is chosen over an array or plain object because standard Map operations (`has`, `get`, `set`) run in average $\mathcal{O}(1)$ constant time complexity.

* **`for (let i = 0; i < nums.length; i++)`**  
  We set up a standard `for` loop to iterate through every element of `nums` sequentially by index `i`.

* **`const complement = target - nums[i];`**  
  For the current number `nums[i]`, we calculate the exact scalar value needed to reach `target`. For instance, if `target = 9` and `nums[i] = 2`, `complement` becomes `7`.

* **`if (map.has(complement))`**  
  We query the hash map in $\mathcal{O}(1)$ time to see if we have previously seen and stored the required `complement`.

* **`return [map.get(complement), i];`**  
  *(Completed logic flow)*: If `complement` is present in the map, `map.get(complement)` yields the index of that complement. We immediately exit the function and return the pair of indices `[map.get(complement), i]`.

* **`map.set(nums[i], i);`**  
  *(Completed logic flow)*: If the complement is not in the map, we insert the current value as the key and its index `i` as the value (`map.set(nums[i], i)`), making it available for subsequent elements to match against.

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
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n)$  
  We traverse the array containing $n$ elements only once. Each lookup (`map.has`) and insertion (`map.set`) operation in a Hash Map takes $\mathcal{O}(1)$ average time. Thus, the total time complexity is linear, $\mathcal{O}(n)$.

- **Space Complexity:** $\mathcal{O}(n)$  
  In the worst-case scenario (where the matching pair is at the very end of the array), we will store $n - 1$ elements in the `Map`. Thus, the auxiliary space required scales linearly with the size of the input array.

---

## 🕵️‍♂️ Follow-up Questions (Optional)

### 1. What if the input array `nums` is already sorted in ascending order?
**Answer:** If the array is already sorted, we can optimize the **space complexity** from $\mathcal{O}(n)$ down to $\mathcal{O}(1)$ using the **Two Pointers** pattern:
- Place `left` pointer at index `0` and `right` pointer at index `nums.length - 1`.
- Compute `sum = nums[left] + nums[right]`.
- If `sum === target`, return `[left, right]`.
- If `sum < target`, increment `left++` (to increase the sum).
- If `sum > target`, decrement `right--` (to decrease the sum).

### 2. How does the Hash Map handle duplicate numbers in the array?
**Answer:** The single-pass hash map handles duplicate numbers naturally without overwriting issues. 

For example, if `nums = [3, 3]` and `target = 6`:
1. At `i = 0`: `nums[0] = 3`, `complement = 3`. `map.has(3)` is `false`. So we store `map.set(3, 0)`.
2. At `i = 1`: `nums[1] = 3`, `complement = 3`. We check `map.has(3)` **before** inserting `nums[1]`. `map.has(3)` returns `true` (matching index `0`).
3. The function returns `[0, 1]` successfully before any key collision occurs.