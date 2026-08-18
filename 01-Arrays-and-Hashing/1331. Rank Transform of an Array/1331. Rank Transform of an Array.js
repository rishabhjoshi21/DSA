1/**
2 * @param {number[]} arr
3 * @return {number[]}
4 */
5var arrayRankTransform = function(arr) {
6    const temp = [...arr];
7    temp.sort((a,b)=>a-b);
8    let map = new Map()
9    let currentRank = 1;
10
11    for(let num of temp) {
12        if(!map.has(num)) {
13            map.set(num, currentRank++);
14        }   
15    }
16
17    for(let i = 0; i < arr.length; i++) {
18        arr[i] = map.get(arr[i])
19    }
20    
21    return arr;
22};