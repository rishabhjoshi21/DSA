/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    while (true) {
        let product = 1;
        let temp = n;
        
        // Extract digits mathematically
        while (temp > 0) {
            product *= temp % 10;
            
            // Early exit: if product becomes 0, it is divisible by any 't'
            if (product === 0) break; 
            
            temp = Math.floor(temp / 10);
        }
        
        // Check if the condition is met
        if (product % t === 0) {
            return n;
        }
        
        n++; // Move to the next number
    }
    
};