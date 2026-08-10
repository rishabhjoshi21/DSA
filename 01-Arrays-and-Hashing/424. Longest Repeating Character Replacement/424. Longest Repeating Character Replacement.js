1/**
2 * @param {string} s
3 * @param {number} k
4 * @return {number}
5 */
6var characterReplacement = function(s, k) {
7    let map = new Map();
8    let maxLength = 0;
9    let maxFrequency = 0;
10    let left = 0;
11
12    for(let right=0; right<s.length; right++) {
13        
14        map.set(s[right], (map.get(s[right]) || 0) + 1);
15
16        maxFrequency = Math.max(maxFrequency, map.get(s[right]));
17
18        while((right - left + 1) - maxFrequency > k){
19
20            map.set(s[left], map.get(s[left])-1);
21            
22            left++
23        }
24
25        maxLength = Math.max(maxFrequency, right - left + 1)
26    }
27    return maxLength
28};