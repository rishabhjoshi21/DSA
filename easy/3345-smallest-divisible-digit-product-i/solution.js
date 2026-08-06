/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    const num = n.toString();
    const multi = num[0] * num[1];
    if(n<10) {
        if(n%t === 0){
            return n
        }else{
            return smallestNumber(n+1,t)
        }
    }
    if(multi%t === 0){
        return n
    }else{
        return smallestNumber(n+1,t)
    }
    
};