1/**
2 * @param {string} s
3 * @return {number}
4 */
5var lengthOfLongestSubstring = function(s) {
6    let left = 0;
7    let set = new Set();
8    let maxLength = 0;
9    for(let i = 0; i<s.length; i++){
10        while(set.has(s[i])){
11            set.delete(s[left])
12            left++
13        }
14        set.add(s[i]);
15        maxLength = Math.max(maxLength, set.size)
16    }
17    return maxLength
18};