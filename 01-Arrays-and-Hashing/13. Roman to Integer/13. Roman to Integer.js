1/**
2 * @param {string} s
3 * @return {number}
4 */
5var romanToInt = function(s) {
6    const map = new Map([[I,1],[V,5],[X,10],[L,50],[C,100],[D,500],[M,1000]]);
7    let total = 0;
8    for(let i=s.length-1; i>=0; i--){
9        if(map.get(s[i])> map.get(s[i-1])){
10            total += map.get(s[i]) - map.get(s[i-1])
11            i--
12        }else{
13            total += map.get(s[i])
14        }
15    }
16    return total
17};