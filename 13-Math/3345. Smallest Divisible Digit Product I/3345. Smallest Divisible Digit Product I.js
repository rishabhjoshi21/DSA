1/**
2 * @param {number} n
3 * @param {number} t
4 * @return {number}
5 */
6var smallestNumber = function(n, t) {
7    while (true) {
8        let product = 1;
9        let temp = n;
10        
11        // Extract digits mathematically
12        while (temp > 0) {
13            product *= temp % 10;
14            
15            // Early exit: if product becomes 0, it is divisible by any 't'
16            if (product === 0) break; 
17            
18            temp = Math.floor(temp / 10);
19        }
20        
21        // Check if the condition is met
22        if (product % t === 0) {
23            return n;
24        }
25        
26        n++; // Move to the next number
27    }
28    
29};