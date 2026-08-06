# Smallest Divisible Digit Product I

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)

## Problem

You are given two integers n and t. Return the smallest number greater than or equal to n such that the product of its digits is divisible by t.

 
Example 1:


Input: n = 10, t = 2

Output: 10

Explanation:

The digit product of 10 is 0, which is divisible by 2, making it the smallest number greater than or equal to 10 that satisfies the condition.


Example 2:


Input: n = 15, t = 3

Output: 16

Explanation:

The digit product of 16 is 6, which is divisible by 3, making it the smallest number greater than or equal to 15 that satisfies the condition.


 
Constraints:


	1 <= n <= 100
	1 <= t <= 10

## Solution

**Language:** JavaScript  
**Runtime:** 1 ms (beats 45.45%)  
**Memory:** 56.1 MB (beats 27.27%)  
**Submitted:** 2026-08-06T18:36:54.015Z  

```js
/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    while (true) {
        let product = 1;
        let temp = n;
        
        // Extract digits mathematically
        while (temp > 0) {
            product *= temp % 10;
            
            // Early exit: if product becomes 0, it is divisible by any 't'
            if (product === 0) break; 
            
            temp = Math.floor(temp / 10);
        }
        
        // Check if the condition is met
        if (product % t === 0) {
            return n;
        }
        
        n++; // Move to the next number
    }
    
};
```

---

[View on LeetCode](https://leetcode.com/problems/smallest-divisible-digit-product-i/)