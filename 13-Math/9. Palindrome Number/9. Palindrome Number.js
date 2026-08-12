1/**
2 * @param {number} x
3 * @return {boolean}
4 */
5var isPalindrome = function(x) {
6    let reverse = 0;
7    let copy = x;
8
9    while(copy>0){
10        const digit = copy%10;
11        reverse = reverse *10 + digit
12        copy = ~~(copy / 10)
13    }
14    return reverse === x
15};