<h2><a href="https://leetcode.com/problems/longest-repeating-character-replacement">424. Longest Repeating Character Replacement</a></h2>

<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p>

<p>Return <em>the length of the longest substring containing the same letter you can get after performing the above operations</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "ABAB", k = 2
<strong>Output:</strong> 4
<strong>Explanation:</strong> Replace the two 'A's with two 'B's or vice versa.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "AABABBA", k = 1
<strong>Output:</strong> 4
<strong>Explanation:</strong> Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of only uppercase English letters.</li>
	<li><code>0 &lt;= k &lt;= s.length</code></li>
</ul>


---

# 🛍️ Longest-Repeating-Character-Replacement | Explained

## Approach 1: Dynamic Sliding Window with Frequency Tracking

### Intuition
Imagine you are organizing a seated queue of guests for a movie night. Each guest prefers a specific movie genre (represented by uppercase letters). You have $k$ VIP "genre-conversion" vouchers that can persuade guests with different preferences to switch to the majority choice of that section. Your goal is to find the longest continuous section of guests that can all agree on the same movie, using at most $k$ vouchers.

To solve this efficiently, we use a **Sliding Window**. As we scan through the queue (expanding our right boundary), we track the count of each guest's preference. The key insight is that within any window, the minimum number of conversions required is the **total size of the window minus the frequency of the most common character in that window**:

$$\text{Replacements Needed} = \text{Window Size} - \text{Max Frequency}$$

If this value exceeds $k$, our window is invalid, so we shrink it from the left until it becomes valid again.

---

### Algorithm Visualized

Since diagrams are excluded, here is a step-by-step state trace for $s = \text{"AABABBA"}$ and $k = 1$:

1. **Initial State:** `left = 0`, `maxLength = 0`, `maxFrequency = 0`, `map = {}`

2. **Step 1 (`right = 0`, `s[0] = 'A'`):**
   - Window: `"A"` (length = 1)
   - `map`: `{'A': 1}`
   - `maxFrequency = 1`
   - Replacements needed: $1 - 1 = 0 \le k$ (Valid)
   - `maxLength = 1`

3. **Step 2 (`right = 1`, `s[1] = 'A'`):**
   - Window: `"AA"` (length = 2)
   - `map`: `{'A': 2}`
   - `maxFrequency = 2`
   - Replacements needed: $2 - 2 = 0 \le k$ (Valid)
   - `maxLength = 2`

4. **Step 3 (`right = 2`, `s[2] = 'B'`):**
   - Window: `"AAB"` (length = 3)
   - `map`: `{'A': 2, 'B': 1}`
   - `maxFrequency = 2`
   - Replacements needed: $3 - 2 = 1 \le k$ (Valid)
   - `maxLength = 3`

5. **Step 4 (`right = 3`, `s[3] = 'A'`):**
   - Window: `"AABA"` (length = 4)
   - `map`: `{'A': 3, 'B': 1}`
   - `maxFrequency = 3`
   - Replacements needed: $4 - 3 = 1 \le k$ (Valid)
   - `maxLength = 4`

6. **Step 5 (`right = 4`, `s[4] = 'B'`):**
   - Window: `"AABAB"` (length = 5)
   - `map`: `{'A': 3, 'B': 2}`
   - `maxFrequency = 3`
   - Replacements needed: $5 - 3 = 2 > k$ (Invalid!)
   - **Shrink Window (`while` loop execution):**
     - Decrement `map['A']` to $2$, increment `left` to $1$.
     - New Window: `"ABAB"` (length = 4)
     - Replacements needed: $4 - 3 = 1 \le k$ (Valid)
   - `maxLength = 4`

7. **Final Result:** `maxLength = 4` (Substrings like `"AABA"` converted to `"AAAA"` or `"ABBA"` converted to `"BBBB"`).

---

### Approach

1. **Initialize Data Structures:**
   - A `Map` (or hash map) to keep track of character frequencies within the current sliding window.
   - Pointers `left` (window start) and `right` (window end).
   - Variables `maxFrequency` (highest frequency of a single character in the window) and `maxLength` (maximum valid window size found so far).

2. **Expand the Window (`right` pointer):**
   - Iterate `right` from index `0` to `s.length - 1`.
   - Increment the frequency count of `s[right]` in the map.
   - Update `maxFrequency` with `Math.max(maxFrequency, map.get(s[right]))`.

3. **Contract the Window (`left` pointer) if Invalid:**
   - Calculate non-matching characters: `(right - left + 1) - maxFrequency`.
   - If this count exceeds $k$, decrement the frequency of `s[left]` in the map and increment `left`.

4. **Update Answer:**
   - Track the maximum length obtained: `maxLength = Math.max(maxLength, right - left + 1)`.

---

### Detailed Code Analysis

```javascript
1/**
2 * @param {string} s
3 * @param {number} k
4 * @return {number}
5 */
6var characterReplacement = function(s, k) {
7    let map = new Map();
8    let maxLength = 0;
9    let maxFrequency = 0;
10   let left = 0;
```
- **Lines 7–10:** We initialize our state tracking variables. `map` stores frequencies of characters in the active window `[left...right]`. `left` anchors the left boundary of our sliding window.

```javascript
12    for(let right=0; right<s.length; right++) {
13        
14        map.set(s[right], (map.get(s[right]) || 0) + 1);
15
16        maxFrequency = Math.max(maxFrequency, map.get(s[right]));
```
- **Line 12:** The loop moves the `right` pointer one character at a time, expanding our candidate window.
- **Line 14:** We fetch the current count of `s[right]` from `map` (defaulting to `0` if undefined) and increment it by `1`.
- **Line 16:** `maxFrequency` tracks the maximum count of any single character inside the current window context. *Note:* `maxFrequency` does not need to be decremented when the window shrinks, because we are only interested in finding windows *larger* than our current best.

```javascript
18        while((right - left + 1) - maxFrequency > k){
19
20            map.set(s[left], map.get(s[left])-1);
21            
22            left++
23        }
```
- **Line 18:** `(right - left + 1)` calculates the current window length. Subtracting `maxFrequency` yields the number of characters that must be replaced. If this number is strictly greater than `k`, the window is invalid.
- **Lines 20–22:** We shrink the window by decrementing the count of `s[left]` in `map` and advancing `left` to the right.

```javascript
25        maxLength = Math.max(maxFrequency, right - left + 1)
26    }
27    return maxLength
28};
```
- **Line 25:** Updates `maxLength`. Note: Pass `maxLength` (or `right - left + 1`) to `Math.max` for idiomatic maintenance, though evaluating `right - left + 1` directly reflects the largest valid window size.
- **Line 27:** Returns the maximum length computed.

---

### Code

```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let map = new Map();
    let maxLength = 0;
    let maxFrequency = 0;
    let left = 0;

    for(let right=0; right<s.length; right++) {
        
        map.set(s[right], (map.get(s[right]) || 0) + 1);

        maxFrequency = Math.max(maxFrequency, map.get(s[right]));

        while((right - left + 1) - maxFrequency > k){

            map.set(s[left], map.get(s[left])-1);
            
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
};
```

---

### Complexity

- **Time Complexity:** $\mathcal{O}(N)$
  - $N$ is the length of the string `s`.
  - Both `right` and `left` pointers traverse the string at most once. Map operations (`get` and `set`) take $\mathcal{O}(1)$ average time.

- **Space Complexity:** $\mathcal{O}(1)$
  - The map will store at most $26$ entries (for English uppercase letters), making the space complexity constant regardless of input size $N$.

---

## 🌐 Real-World Scenarios & Examples

### 1. Data Transmission & Noise Cancellation in Telecommunications
* **Scenario:** In wireless data transmission, data packets arrive as stream streams (e.g., signal levels or bit streams). Due to interference, up to $k$ corrupted bits/packets can occur in sequence.
* **Application:** Network hardware uses sliding window forward-error correction (FEC) buffers to calculate the longest contiguous stable signal stream assuming $k$ dropped or corrupt packets can be replaced or interpolated.

### 2. Genomic Sequence Analysis (Bioinformatics)
* **Scenario:** DNA sequences consist of long strings composed of nucleotide bases: `A`, `C`, `G`, and `T`. Geneticists search for preserved evolutionary sub-sequences (motifs) that allow for up to $k$ single-nucleotide polymorphisms (mutations).
* **Application:** Finding the longest matching DNA region where up to $k$ base mutations can be swapped to match a dominant base variant.

### 3. Audio / Video Streaming Buffer Management
* **Scenario:** During live video streaming, frames are streamed continuously. If frame transmission degrades, video players can drop or duplicate up to $k$ dropped frames without causing observable stutter to the user.
* **Application:** A sliding window algorithm evaluates quality segments to guarantee maximum continuous playback length under network jitter constraints.

---

## 🕵️‍♂️ Follow-up Questions

### 1. Why don't we need to recalculate `maxFrequency` downward when we shrink the window from the left?
**Answer:** 
We only care about finding a window size **strictly larger** than the maximum window size we have already found. A smaller or equal window size will never update `maxLength`. 

Because `maxLength` only increases when `maxFrequency` increases, stale or slightly higher historical values of `maxFrequency` after window shrinkage will not produce false positives—they will simply keep shrinking or maintaining the window until a new, genuinely larger frequency is encountered.

### 2. How can we optimize memory allocation in high-performance environments (e.g., C++ / Java / Rust)?
**Answer:** 
Instead of dynamic hash map allocations (`new Map()`), we can use a fixed-size integer array of length 26:
`int[] count = new int[26];`

Character frequency updates can then be done via ASCII offset arithmetic:
`count[s[right] - 'A']++`

This eliminates heap memory overhead, reduces garbage collection pressure, and provides optimal cache locality.