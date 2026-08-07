1/**
2 * @param {number[]} cardPoints
3 * @param {number} k
4 * @return {number}
5 */
6var maxScore = function(cardPoints, k) {
7    let maxSum = 0;
8    let leftSum = 0;
9    let rightSum = 0;
10
11    for(let i = 0; i<=k-1; i++){
12        leftSum += cardPoints[i]
13    }
14    maxSum = leftSum;
15
16    let rightIdx = cardPoints.length - 1;
17    for(let i=k-1; i>= 0; i--){
18        leftSum = leftSum - cardPoints[i];
19        rightSum += cardPoints[rightIdx];
20        rightIdx --;
21
22        maxSum = Math.max(maxSum, leftSum + rightSum)
23    }
24
25    return maxSum
26
27    
28};