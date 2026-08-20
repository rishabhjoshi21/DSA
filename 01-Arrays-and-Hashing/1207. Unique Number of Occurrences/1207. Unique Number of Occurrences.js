1/**
2 * @param {number[]} arr
3 * @return {boolean}
4 */
5var uniqueOccurrences = function(arr) {
6    const freq = new Map();
7
8    // Count frequency of each number
9    for (const num of arr) {
10        freq.set(num, (freq.get(num) || 0) + 1);
11    }
12
13    // Get all frequencies
14    const occurrences = [...freq.values()];
15
16    // Set removes duplicate frequencies
17    return occurrences.length === new Set(occurrences).size;
18};