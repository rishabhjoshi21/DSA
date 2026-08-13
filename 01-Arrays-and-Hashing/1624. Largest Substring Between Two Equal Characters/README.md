<h2><a href="https://leetcode.com/problems/largest-substring-between-two-equal-characters">1624. Largest Substring Between Two Equal Characters</a></h2>

<p>Given a string <code>s</code>, return <em>the length of the longest substring between two equal characters, excluding the two characters.</em> If there is no such substring return <code>-1</code>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aa"
<strong>Output:</strong> 0
<strong>Explanation:</strong> The optimal substring here is an empty substring between the two <code>'a's</code>.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abca"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The optimal substring here is "bc".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "cbzxy"
<strong>Output:</strong> -1
<strong>Explanation:</strong> There are no characters that appear twice in s.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 300</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>


---

# 🛍️ Largest-Substring-Between-Two-Equal-Characters | Explained

## Approach 1: Hash Map First-Occurrence Index Tracking

### Intuition
To find the maximum length of a substring between two equal characters, we need to maximize the distance between their indices. For any given character that appears multiple times in the string, the maximum possible distance will always be between its **first occurrence** and its **current (or last) occurrence**.

Imagine a line of people holding numbered flags with letters on them. If you want to find the longest distance between two people holding the letter `'a'`, you only need to remember where the *very first* person holding `'a'` was standing. Every time you spot another person holding `'a'` further down the line, you subtract the first person's position from the current position (minus 1 to exclude the endpoints). Updating the recorded position of the first `'a'` would only shorten future distances, so you keep the original first position intact.

### Approach
1. **Initialize Tracking Data Structures**:
   - Create a hash map (`map`) to record the index of the first time each character is encountered.
   - Initialize a variable `max` to `-1` to handle the default case where no repeating characters are present in the string.

2. **Iterate Through the String**:
   - Loop through string `s` from index `0` to `s.length - 1`.
   - **First Occurrence**: If the current character `s[i]` is not present in `map`, insert `s[i]` as the key and current index `i` as the value.
   - **Subsequent Occurrence**: If `s[i]` already exists in `map`, retrieve its first occurrence index (`map.get(s[i])`). Calculate the number of characters strictly between them using the formula:
     $$\text{substring length} = i - \text{first\_index} - 1$$
   - Update `max` with the larger of its current value and the newly calculated length using `Math.max()`.

3. **Return Result**:
   - Return `max`. If no duplicate characters were found, it remains `-1`.

### Detailed Code Analysis

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function(s) {
    // Stores character as key and its FIRST index as value
    const map = new Map();
    // Default to -1 if no equal characters are found
    let max = -1;

    for (let i = 0; i < s.length; i++) {
        // If character hasn't been seen before, record its initial index
        if (!map.has(s[i])) {
            map.set(s[i], i);
        } else {
            // Calculate distance between current index 'i' and first occurrence
            // Math.max ensures we retain the largest span found across all characters
            max = Math.max(max, i - map.get(s[i]) - 1);
        }
    }
    return max;
};
```

- **Line 6 (`const map = new Map();`)**: A JavaScript `Map` object is chosen for $O(1)$ average-time key lookups and insertions.
- **Line 7 (`let max = -1;`)**: Initialized to `-1` per problem requirements, automatically returning `-1` if all characters in string `s` are unique.
- **Line 9 (`for (let i = 0; i < s.length; i++)`)**: A single-pass iteration ensuring $O(N)$ time complexity.
- **Lines 10-11 (`if (!map.has(s[i]))`)**: Ensures we *only* record the index of the first occurrence. Crucially, we do not overwrite `map.get(s[i])` on subsequent occurrences so that we preserve the maximum potential span.
- **Line 13 (`max = Math.max(max, i - map.get(s[i]) - 1);`)**: The formula `i - map.get(s[i]) - 1` calculates the number of elements *strictly between* indices `i` and `map.get(s[i])`. For example, for indices $2$ and $5$, the elements between are at indices $3$ and $4$, giving a length of $5 - 2 - 1 = 2$.

### Code
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function(s) {
    const map = new Map();
    let max = -1;

    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], i);
        } else {
            max = Math.max(max, i - map.get(s[i]) - 1);
        }
    }
    return max;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the length of string `s`. We iterate through the string once. Hash map insertions (`set`) and lookups (`has`, `get`) run in $\mathcal{O}(1)$ average time.
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space. Although a hash map is used, the problem constraints restrict the input string to lowercase English letters. Thus, the map will store at most $26$ key-value pairs, making space consumption bounded and constant ($\mathcal{O}(\Sigma)$ where alphabet size $\Sigma = 26$).

---

## 🌐 Real-World Scenarios & Examples

### 1. Log Telemetry and Session Timeout Analysis
In distributed systems, server logs stream event entries tagged with correlation IDs or user session tokens. To detect long-running background tasks or calculate the maximum time gap between an initial user action and a subsequent action, telemetry engines monitor incoming logs.
* **Example**: Given a log stream sequence of transaction IDs `["tx1", "tx2", "tx3", "tx1", "tx4"]`, tracking the index distance between the first `"tx1"` and the second `"tx1"` allows system analyzers to measure processing latency or unclosed session windows.

### 2. DNA Sequence & Genomic Motif Spacing
In bioinformatics, analyzing biological sequences (such as DNA or RNA) requires finding the distance between recurring nucleotide bases or sequence motifs (e.g., repeating `A`, `C`, `G`, or `T` bases).
* **Example**: Given a genome sequence `"ATCGGACTAC"`, finding the maximum distance between identical bases helps researchers identify non-coding structural loops or binding site distances in genetic strands.

### 3. Data Compression Window Sizing (LZ77 / Sliding Window)
Dictionary-based compression algorithms (like LZ77 used in DEFLATE/ZIP) search for repeated patterns in data streams to replace duplicates with reference pointers `(distance, length)`.
* **Example**: Knowing the maximum span between identical bytes in a buffer allows compression encoders to determine optimal search buffer sizes or decide whether sliding window dictionary indexing is worth applying.

---

## 🕵️‍♂️ Follow-up Questions

### 1. Can we optimize the space usage to avoid the overhead of JavaScript `Map` allocations?
**Answer:** Yes. Since the input consists only of lowercase English letters (`'a'` to `'z'`), we can replace `Map` with a fixed-size array of length 26 initialized with `-1`. 
```javascript
var maxLengthBetweenEqualCharacters = function(s) {
    const firstSeen = new Array(26).fill(-1);
    let max = -1;

    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i) - 97; // 97 is ASCII for 'a'
        if (firstSeen[code] === -1) {
            firstSeen[code] = i;
        } else {
            max = Math.max(max, i - firstSeen[code] - 1);
        }
    }
    return max;
};
```
This reduces garbage collection pressure and memory overhead caused by instantiating `Map` objects.

### 2. What if the input string contains full Unicode/UTF-16 characters or emojis?
**Answer:** In JavaScript, indexing strings containing 32-bit surrogate pairs (like emojis) with `s[i]` or `s.length` can split characters across UTF-16 code units. To handle Unicode safely, you should iterate using the string iterator (`for...of` or `Array.from(s)`) to process full Unicode code points correctly.