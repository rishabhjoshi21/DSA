<h2><a href="https://leetcode.com/problems/container-with-most-water">11. Container With Most Water</a></h2>

<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>

<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>

<p>Return <em>the maximum amount of water a container can store</em>.</p>

<p><strong>Notice</strong> that you may not slant the container.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" style="width: 600px; height: 287px;">
<pre><strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]
<strong>Output:</strong> 49
<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> height = [1,1]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == height.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>
</ul>


---

# 🛍️ Container-With-Most-Water | Explained

## Approach 1: Two Pointers Strategy (Greedy Elimination)

### Intuition
Imagine you are trying to enclose the maximum amount of water between two vertical vertical boundary walls on a flat terrain. The total area of water a container can hold is constrained by two variables:
1. **The width between the two walls:** The farther apart the walls are, the larger the base of the container.
2. **The height of the shorter wall:** Water spills over the shorter wall, making it the bottleneck (limiting factor) for the container's total depth.

To maximize the area, we want both maximum width and maximum height. We start with the widest possible container by placing two pointers at the extreme ends of the array (`left` at index `0` and `right` at index `length - 1`). 

At each step, we calculate the area formed between these two boundaries. To explore potential larger areas, we must move one of the pointers inward. Moving any pointer reduces the width by `1`. Therefore, to compensate for the lost width and potentially find a larger area, we *must* attempt to increase the bottleneck height. 

If we move the pointer pointing to the taller line, the bottleneck height remains capped by the shorter line (or gets even smaller), while the width strictly decreases—guaranteeing a smaller or equal area. Thus, the only rational greedy choice is to move the pointer at the **shorter** line inward, in the hope of finding a taller wall that outweighs the loss in width.

---

### Algorithm Visualized

*Note: Per custom instructions, diagrams and visual flowcharts have been omitted. Below is a text-based trace of pointer state transitions for array `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`.*

1. **Initial State:** 
   - `left` = 0 (height = 1), `right` = 8 (height = 7)
   - `width` = 8 - 0 = 8
   - `minHeight` = min(1, 7) = 1
   - `currentMax` = 8 * 1 = 8 | `max` = 8
   - *Action:* `height[left]` (1) < `height[right]` (7) $\rightarrow$ `left++` (move shorter pointer).

2. **Step 2:**
   - `left` = 1 (height = 8), `right` = 8 (height = 7)
   - `width` = 8 - 1 = 7
   - `minHeight` = min(8, 7) = 7
   - `currentMax` = 7 * 7 = 49 | `max` = max(8, 49) = 49
   - *Action:* `height[left]` (8) > `height[right]` (7) $\rightarrow$ `right--`.

3. **Step 3:**
   - `left` = 1 (height = 8), `right` = 7 (height = 3)
   - `width` = 7 - 1 = 6
   - `minHeight` = min(8, 3) = 3
   - `currentMax` = 6 * 3 = 18 | `max` = 49
   - *Action:* `height[left]` (8) > `height[right]` (3) $\rightarrow$ `right--`.

*This process continues until `left` meets `right`, ensuring every candidate pair capable of producing a larger area is checked while skipping pairs that are mathematically proven to yield smaller areas.*

---

### Approach

1. **Initialize Boundaries:** Set `left` pointer to index `0` and `right` pointer to `height.length - 1`. Initialize `max` to `0` to track the peak container area found so far.
2. **Loop Condition:** Iterate using a `while` loop as long as `left < right`. When `left === right`, the container width becomes zero, making further evaluation impossible.
3. **Calculate Width & Bottleneck:**
   - `width = right - left`
   - `minHeight = Math.min(height[left], height[right])`
4. **Calculate Current Area:**
   - `currentMax = width * minHeight`
5. **Update Max Area:** If `currentMax > max`, update `max = currentMax`.
6. **Greedy Pointer Movement:**
   - If `height[left] > height[right]`, decrement `right` (`right--`).
   - Otherwise (if `height[left] <= height[right]`), increment `left` (`left++`).
7. **Return Result:** Once pointers cross, return `max`.

---

### Detailed Code Analysis

Let's break down your specific JavaScript implementation line-by-line:

```javascript
5var maxArea = function(height) {
6    let left = 0;
7    let right = height.length-1;
8    let max = 0
```
- **Lines 6–8:** We initialize primitive integer variables. `left` points to the start of the array, `right` points to the last index (`height.length - 1`), and `max` stores the highest area recorded. Using primitive numbers avoids any overhead and operates in $O(1)$ space.

```javascript
9    while(left < right){
10        let width = right -  left;
11        const minHeight = Math.min(height[left], height[right]);
```
- **Line 9:** The `while` condition checks `left < right`. This ensures we evaluate every valid two-line pair without processing a line with itself.
- **Line 10:** `width` is computed as the distance between array indices (`right - left`).
- **Line 11:** `Math.min()` calculates the limiting vertical boundary. Water cannot exceed the shorter of `height[left]` or `height[right]`.

```javascript
13        const currentMax = width * minHeight
14        if(currentMax> max) max = currentMax
```
- **Line 13:** Calculates the area bounded by the current pair of pointers.
- **Line 14:** Evaluates if the `currentMax` area exceeds our historical maximum (`max`). If so, `max` is reassigned. (Can also be written as `max = Math.max(max, currentMax)`).

```javascript
15        if(height[left] > height[right]){
16            right--
17        }else{
18            left++
19        }
20    }
21    return max
22};
```
- **Lines 15–19:** The core greedy logic. We inspect the heights of the walls at both pointers:
  - If the wall at `left` is strictly taller than the wall at `right`, we contract the right side (`right--`).
  - Otherwise (if `height[left] <= height[right]`), we contract the left side (`left++`).
- **Line 21:** Returns the accumulated maximum area found after the loop terminates.

---

### Code

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;
    
    while (left < right) {
        let width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        
        const currentMax = width * minHeight;
        if (currentMax > max) max = currentMax;
        
        if (height[left] > height[right]) {
            right--;
        } else {
            left++;
        }
    }
    
    return max;
};
```

---

### Complexity

- **Time Complexity:** $\mathcal{O}(N)$  
  - Where $N$ is the length of the `height` array.
  - In each iteration of the `while` loop, either `left` is incremented or `right` is decremented.
  - The total distance between `left` and `right` starts at $N - 1$ and decreases by $1$ at every step. Thus, the loop runs at most $N - 1$ times.

- **Space Complexity:** $\mathcal{O}(1)$  
  - Only a constant amount of extra memory is allocated for pointer tracking variables (`left`, `right`, `max`, `width`, `minHeight`, `currentMax`). No additional array or object allocations are made.

---

## 🌐 Real-World Scenarios & Examples

### 1. Data Center Bandwidth Optimization
**Scenario:** Imagine a network route with multiple interconnected data centers or edge nodes spaced along a highway network. Each node has a limited network processing bandwidth (height), and the latency/distance between nodes dictates the buffer size / throughput channel (width).
- **Application:** To establish a high-throughput, dual-node data mirroring pipeline, engineers need to pick two nodes such that `Distance * Min(Bandwidth_Node_A, Bandwidth_Node_B)` is maximized. The two-pointer greedy approach allows real-time calculation of optimal node pairing without running an $O(N^2)$ brute-force comparative check across thousands of servers.

### 2. Stock Trading Spread & Arbitrage Windows
**Scenario:** An algorithmic trading firm evaluates liquidity depth across a continuous time window during market hours. The height represents order book depth (liquidity) at time $T$, and the distance between two time points represents the duration of the holding window.
- **Application:** Finding the maximum potential capital deployment capacity requires selecting two time bounds where `Duration * Min(Liquidity_T1, Liquidity_T2)` is maximized to avoid market slippage.

### 3. Solar Panel / Signal Receiver Placement in Urban Architecture
**Scenario:** Urban planners install microwave link receivers atop buildings of varying heights along a straight boulevard. The effective signal transmission area between two buildings is bounded by the distance between them and the clearance height of the shorter building (to prevent signal obstruction by surrounding urban baseline).
- **Application:** The two-pointer algorithm quickly identifies the optimal pair of buildings along a street axis to install long-range receivers, maximizing signal field coverage area.

---

## 🕵️‍♂️ Follow-up Questions

### 1. Why does the greedy choice of moving the shorter pointer guarantee we don't skip the optimal solution?
**Answer:**  
Let the current boundaries be `left` and `right`, with `height[left] < height[right]`. The area is `(right - left) * height[left]`.  
If we keep `left` fixed and move `right` to any internal position `k` (where `left < k < right`):
- The new width `(k - left)` is strictly less than `(right - left)`.
- The new height `Math.min(height[left], height[k])` can never exceed `height[left]`.

Therefore, all pairs `(left, k)` for any `k` are mathematically guaranteed to yield an area strictly smaller than the area with `(left, right)`. Moving the shorter pointer eliminates these sub-optimal candidate pairs safely without missing a potential maximum.

### 2. Can this problem be solved if we need to return the *indices* of the two walls instead of the maximum area?
**Answer:**  
Yes. Instead of tracking just `let max = 0`, we track an object or array storing the best indices, e.g., `let bestPair = [0, 0]`. Whenever `currentMax > max`, we update `max = currentMax` and store `bestPair = [left, right]`. At the end of the loop, return `bestPair`.