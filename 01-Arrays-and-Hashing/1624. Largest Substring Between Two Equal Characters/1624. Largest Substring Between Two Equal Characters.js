1/**
2 * @param {string} s
3 * @return {number}
4 */
5var maxLengthBetweenEqualCharacters = function(s) {
6    const map = new Map();
7    let max = -1;
8
9    for (let i = 0; i < s.length; i++) {
10        if (!map.has(s[i])) {
11            map.set(s[i], i);
12        } else {
13            max = Math.max(max, i - map.get(s[i]) - 1);
14        }
15    }
16    return max
17};