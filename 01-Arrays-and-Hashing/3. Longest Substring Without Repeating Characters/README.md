<h2><a href="https://leetcode.com/problems/longest-substring-without-repeating-characters">3. Longest Substring Without Repeating Characters</a></h2>

<p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_s_" data-state="closed" class=""><strong>substring</strong></button></span> without duplicate characters.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abcabcbb"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is "abc", with the length of 3. Note that <code>"bca"</code> and <code>"cab"</code> are also correct answers.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "bbbbb"
<strong>Output:</strong> 1
<strong>Explanation:</strong> The answer is "b", with the length of 1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "pwwkew"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>
</ul>


---

# 🛍️ Longest-Substring-Without-Repeating-Characters | Explained

## Approach 1: Two-Pointer Sliding Window with Hash Set

### Intuition
Imagine a flexible, stretchable picture frame placed over a row of items. You want to expand the right edge of the frame as far as possible to capture as many items as possible. However, the rule is that all items inside the frame must be unique. 

As soon as the item enterering the right side of the frame duplicates an item already inside, you cannot keep expanding right. Instead, you contract the left edge of the frame step-by-step, removing items from the left, until the duplicate item is kicked out of the frame. Once the duplicate is gone, you can resume expanding the right edge. This dynamic expansion and contraction is the essence of the **Sliding Window** technique.

### Approach
1. **Initialize State:** Maintain a `left` pointer initialized to index `0` representing the start of the current window, a `set` to store unique characters currently inside the window, and `maxLength` to record the maximum valid window size found so far.
2. **Expand Right Boundary:** Iterate through the string with a loop index `i` (acting as the right pointer) from `0` to `s.length - 1`.
3. **Handle Duplicates (Contract Window):** Before adding `s[i]` to the set, check if `s[i]` already exists in `set`. If it does, continuously remove `s[left]` from `set` and increment `left` by `1` until `s[i]` is no longer in `set`.
4. **Update Window State:** Add `s[i]` to `set`.
5. **Track Maximum:** Calculate the current window size (`set.size`) and update `maxLength` using `Math.max(maxLength, set.size)`.
6. **Return Result:** Once the string iteration finishes, return `maxLength`.

### Detailed Code Analysis

Let's break down the exact JavaScript execution line by line:

```javascript
5var lengthOfLongestSubstring = function(s) {
6    let left = 0;
7    let set = new Set();
8    let maxLength = 0;
```
* **Line 6 (`let left = 0;`):** Tracks the left boundary of our sliding window.
* **Line 7 (`let set = new Set();`):** We use a JavaScript `Set` because key lookups (`has`), insertions (`add`), and deletions (`delete`) operate in average $\mathcal{O}(1)$ time. The set represents all unique characters present in $s[\text{left} \dots i]$.
* **Line 8 (`let maxLength = 0;`):** Stores the length of the longest valid non-repeating substring found across the entire execution.

```javascript
9    for(let i = 0; i<s.length; i++){
10        while(set.has(s[i])){
11            set.delete(s[left])
12            left++
13        }
```
* **Line 9 (`for(...)`):** The pointer `i` represents the right edge of our window. It advances one character at a time.
* **Lines 10–13 (`while(set.has(s[i]))`):** If the character incoming at `s[i]` is already in our set, we hit a violation. We must contract the window from the left.
  * **Line 11 (`set.delete(s[left])`):** Removes the character at the `left` boundary from our tracked set.
  * **Line 12 (`left++`):** Shifts the `left` boundary one position to the right.
  * This loop continues until `s[i]` is removed from the set, guaranteeing that the window $s[\text{left} \dots i]$ contains no duplicates before we insert `s[i]`.

```javascript
14        set.add(s[i]);
15        maxLength = Math.max(maxLength, set.size)
16    }
17    return maxLength
18};
```
* **Line 14 (`set.add(s[i]);`):** Safe insertion of the current character `s[i]` into our unique character set.
* **Line 15 (`maxLength = Math.max(...)`):** Updates our running maximum. Note that `set.size` directly equals the length of the valid substring $(i - \text{left} + 1)$.
* **Line 17 (`return maxLength`):** Returns the final result after scanning all characters in the string.

### Code
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0;
    let set = new Set();
    let maxLength = 0;
    for(let i = 0; i < s.length; i++){
        while(set.has(s[i])){
            set.delete(s[left]);
            left++;
        }
        set.add(s[i]);
        maxLength = Math.max(maxLength, set.size);
    }
    return maxLength;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the length of string `s`. Although there is a nested `while` loop, each character in the string is visited at most twice: once by the right pointer `i` when added to the set, and at most once by the `left` pointer when deleted from the set. Thus, the total number of operations is bounded by $2N$, which simplifies to $\mathcal{O}(N)$.
- **Space Complexity:** $\mathcal{O}(\min(N, M))$, where $N$ is the length of the string and $M$ is the size of the character set (e.g., 26 for English lowercase letters, 128 for ASCII, or 256 for Extended ASCII). In the worst case, the hash set will store at most $M$ unique characters before forced contraction occurs.

---

## 🌐 Real-World Scenarios & Examples

### 1. Network Packet Buffer Management & Rate Limiting
* **Scenario:** Network routers and API gateways often analyze streaming data logs to detect unique request patterns or identify continuous bursts of distinct session tokens.
* **Example:** A rate-limiter monitors incoming user request headers `"A", "B", "C", "A", "D"`. To determine the longest window of distinct user requests handled concurrently without triggering duplicate execution state locks, the system uses a sliding window algorithm over the payload log.

### 2. Genome Sequencing & Bioinformatics
* **Scenario:** DNA sequences consist of strands of four nucleotide bases (`A`, `C`, `G`, `T`). Researchers search for long contiguous sub-segments containing unique regulatory tags or non-repeating genetic markers.
* **Example:** Given a DNA strand segment `"AGACTGAC"`, finding the longest sub-sequence without repeating nucleotides (e.g., `"GACT"`) helps locate unique reading frames or primers for PCR amplification.

### 3. Text Tokenization & Data Compression Algorithms
* **Scenario:** Adaptive lossy and lossless text compression algorithms (like LZW or LZ77) parse input streams to build dictionaries of non-repeating character sequences.
* **Example:** When parsing text strings to generate optimal dictionary codes, identifying the longest unique token sequences minimizes redundancy and optimizes dictionary slot allocation during encoding.

---

## 🕵️‍♂️ Follow-up Questions

### Q1: Can we optimize the time complexity so the `left` pointer jumps directly instead of incrementing one step at a time?
**Answer:** Yes. Instead of using a `Set` and removing items one by one in a `while` loop, we can use a `Map` (or fixed-size array) to store each character along with its **most recent index**. 

When a duplicate character `s[i]` is encountered, instead of incrementing `left` step-by-step, we can instantly jump `left` to `Math.max(left, map.get(s[i]) + 1)`. This guarantees that `left` never moves backward and reduces the number of operations per character to exactly one.