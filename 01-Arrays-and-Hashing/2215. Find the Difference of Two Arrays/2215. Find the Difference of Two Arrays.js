1/**
2 * @param {number[]} nums1
3 * @param {number[]} nums2
4 * @return {number[][]}
5 */
6var findDifference = function(nums1, nums2) {
7    const set1 = new Set(nums1);
8    const set2 = new Set(nums2);
9
10    const ans1 = [];
11    const ans2 = [];
12
13    for (const num of set1) {
14        if (!set2.has(num)) {
15            ans1.push(num);
16        }
17    }
18
19    for (const num of set2) {
20        if (!set1.has(num)) {
21            ans2.push(num);
22        }
23    }
24
25    return [ans1, ans2];
26};
27