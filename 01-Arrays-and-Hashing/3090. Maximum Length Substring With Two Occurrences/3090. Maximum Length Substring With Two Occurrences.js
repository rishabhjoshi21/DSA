1/**
2 * @param {string} s
3 * @return {number}
4 */
5var maximumLengthSubstring = function(s) {
6    const map = new Map();
7    let left = 0;
8    let result = 0;
9
10    for (let right = 0; right < s.length; right++) {
11        const elem = s[right];
12        map.set(elem, (map.get(elem) || 0) + 1);
13
14        while (map.get(elem) > 2) {
15            const leftChar = s[left];
16            map.set(leftChar, map.get(leftChar) - 1);
17            left++;
18        }
19
20        result = Math.max(result, right - left + 1);
21    }
22
23    return result;
24};