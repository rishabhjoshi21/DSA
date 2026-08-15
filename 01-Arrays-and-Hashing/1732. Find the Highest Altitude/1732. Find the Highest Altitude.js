1/**
2 * @param {number[]} gain
3 * @return {number}
4 */
5var largestAltitude = function(gain) {
6    let altitude = 0;
7    let maxAltitude = 0;
8
9    for (let i = 0; i < gain.length; i++) {
10        altitude += gain[i];
11        maxAltitude = Math.max(maxAltitude, altitude);
12    }
13
14    return maxAltitude;
15};