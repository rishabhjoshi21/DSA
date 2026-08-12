<h2><a href="https://leetcode.com/problems/palindrome-number">9. Palindrome Number</a></h2>

<p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a <span data-keyword="palindrome-integer" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_s_" data-state="closed" class=""><strong>palindrome</strong></button></span>, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> x = 121
<strong>Output:</strong> true
<strong>Explanation:</strong> 121 reads as 121 from left to right and from right to left.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> x = -121
<strong>Output:</strong> false
<strong>Explanation:</strong> From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> x = 10
<strong>Output:</strong> false
<strong>Explanation:</strong> Reads 01 from right to left. Therefore it is not a palindrome.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>
</ul>

<p>&nbsp;</p>
<strong>Follow up:</strong> Could you solve it without converting the integer to a string?

---

# 🛍️ Palindrome-Number | Explained

## Approach 1: Full Integer Reversal via Mathematical Operations

### Intuition
A number is a palindrome if it reads the same forward and backward. Think of this like playing a audio track backwards: if the backward audio matches the forward track exactly, it is symmetric.

Instead of converting the integer into a string—which incurs additional memory overhead for string allocation—we can construct the reversed number mathematically. By repeatedly popping the last digit off our working copy of the number (using modulo base-10) and pushing it onto a new integer accumulator (using base-10 multiplication), we rebuild the number in reverse order. If the final reversed value matches the original input, the number is a palindrome.

### Approach
1. **Preserve the Original Value**: Copy the input `x` into a temporary variable `copy`. We need `x` intact at the end to perform our equality check.
2. **Handle Edge Cases Implicitly**: If `x` is negative (e.g., `-121`), `copy > 0` will evaluate to `false` immediately, skipping the loop. The code will return `0 === x` which correctly evaluates to `false`.
3. **Iterative Extraction and Rebuilding**:
   - Extract the last digit of `copy` using `copy % 10`.
   - Append this digit to `reverse` by multiplying the current `reverse` by `10` and adding the digit.
   - Truncate the last digit from `copy` using double bitwise NOT operator `~~(copy / 10)`.
4. **Compare and Return**: Once `copy` reaches `0`, compare `reverse` with the original input `x`.

### Detailed Code Analysis

Let's dissect the provided JavaScript implementation line-by-line:

- **Lines 6–7:**
  ```javascript
  let reverse = 0;
  let copy = x;
  ```
  `reverse` is initialized to `0` to accumulate the reconstructed reverse integer. `copy` holds the mutated state of `x` throughout the iteration so that `x` remains unaltered for the final comparison.

- **Line 9:**
  ```javascript
  while(copy > 0) {
  ```
  This loop processes every single digit of `copy` from right to left. It terminates as soon as all digits have been truncated (`copy` becomes `0`).

- **Line 10:**
  ```javascript
  const digit = copy % 10;
  ```
  The modulo operator `% 10` retrieves the least significant digit (rightmost digit) of `copy`. For example, if `copy = 123`, `123 % 10` yields `3`.

- **Line 11:**
  ```javascript
  reverse = reverse * 10 + digit;
  ```
  This shifts all digits in `reverse` one position to the left (base-10 shift) and appends `digit` at the units place. 
  - Iteration 1: `0 * 10 + 3 = 3`
  - Iteration 2: `3 * 10 + 2 = 32`
  - Iteration 3: `32 * 10 + 1 = 321`

- **Line 12:**
  ```javascript
  copy = ~~(copy / 10);
  ```
  Dividing `copy` by `10` shifts all digits right by one position. JavaScript's `/` operator performs floating-point division (e.g., `123 / 10 = 12.3`). To truncate the fractional part, the double bitwise NOT operator (`~~`) is used. It casts the float to a 32-bit signed integer, effectively stripping the fractional digits (equivalent to `Math.trunc()` or `Math.floor()` for positive numbers).

- **Line 14:**
  ```javascript
  return reverse === x;
  ```
  Evaluates strict equality between the reversed integer and original input `x`. Returns `true` if symmetric, otherwise `false`.

### Code
```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let reverse = 0;
    let copy = x;

    while(copy > 0) {
        const digit = copy % 10;
        reverse = reverse * 10 + digit;
        copy = ~~(copy / 10);
    }
    return reverse === x;
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(\log_{10}(N))$, where $N$ is the input integer `x`. The number of iterations in the `while` loop corresponds directly to the total number of digits in $N$, which is given by $\lfloor \log_{10}(N) \rfloor + 1$.
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space. The algorithm uses a fixed number of scalar variables (`reverse`, `copy`, `digit`) without allocating dynamic memory or arrays.

---

## 🌐 Real-World Scenarios & Examples

### 1. Bioinformatics & DNA Sequence Analysis
In genomics, palindromic sequences of DNA (e.g., `GAATTC` whose reverse complement matches the sequence) act as recognition sites for restriction enzymes that cut DNA strands. Similar numerical/string symmetry checks are foundational to identification algorithms in genetic sequence analysis.

### 2. Network Data Packet Integrity & Packet Mirroring
In high-performance networking protocols, symmetric payload structures or palindrome-based hash keys are used to verify bidirectional routing protocols. Detecting numerical symmetry rapidly at the bit/byte level allows network hardware to quickly validate packets without unpacking complex data structures.

### 3. Account / Serial Number Validation Algorithms
Financial institutions and manufacturing logistics use checksum algorithms (such as the Luhn algorithm or palindromic sequence rules) for validating transaction numbers, barcode tracking numbers, or credit card inputs on the client side before triggering expensive backend database lookups.

---

## 🕵️‍♂️ Follow-up Questions

### Q1: How can you optimize this solution to avoid reversing the entire number, preventing potential integer overflow in strictly typed languages like C++ or Java?
**Answer:** Instead of reversing the entire integer, you only need to reverse the **second half** of the number and compare it to the first half. 
- You can stop the loop when `reverse >= x`.
- For odd-length numbers, you drop the middle digit using `reverse / 10`.
- This halves the number of operations and prevents the reversed integer from exceeding 32-bit limits ($2^{31} - 1$).

### Q2: What are the trade-offs of using bitwise double NOT (`~~`) versus `Math.trunc()` or `Math.floor()` in JavaScript?
**Answer:**
- **Performance:** Bitwise operations (`~~`) are historically faster in older JS engines because they convert numbers directly to 32-bit integers at the CPU level.
- **Limitation:** Bitwise operators in JavaScript convert numbers to **32-bit signed integers**. If the input number exceeds $2^{31} - 1$ ($2,147,483,647$), bitwise operations overflow and produce negative or wrapped values, causing bugs for very large numbers. `Math.trunc()` is safer for double-precision floating-point numbers.