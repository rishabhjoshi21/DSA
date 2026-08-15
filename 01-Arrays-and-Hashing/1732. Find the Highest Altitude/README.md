<h2><a href="https://leetcode.com/problems/find-the-highest-altitude">1732. Find the Highest Altitude</a></h2>

<p>There is a biker going on a road trip. The road trip consists of <code>n + 1</code> points at various altitudes. The biker starts his trip on point <code>0</code> with altitude equal <code>0</code>.</p>

<p>You are given an integer array <code>gain</code> of length <code>n</code> where <code>gain[i]</code> is the <strong>net gain in altitude</strong> between points <code>i</code>​​​​​​ and <code>i + 1</code> for all (<code>0 &lt;= i &lt; n)</code>. Return <em>the <strong>highest altitude</strong> of a point.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> gain = [-5,1,5,0,-7]
<strong>Output:</strong> 1
<strong>Explanation:</strong> The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> gain = [-4,-3,-2,-1,4,3,2]
<strong>Output:</strong> 0
<strong>Explanation:</strong> The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == gain.length</code></li>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>-100 &lt;= gain[i] &lt;= 100</code></li>
</ul>


---

# 🛍️ Find-the-Highest-Altitude | Explained

## Approach 1: Iterative Accumulation
### Intuition
The core idea behind this approach is to iteratively accumulate the altitude changes and keep track of the maximum altitude encountered so far. This approach works because it simulates the process of traversing the altitude changes one by one, updating the current altitude and maximum altitude accordingly.

### Approach
The algorithm starts with an initial altitude of 0 and a maximum altitude of 0. It then iterates over the array of altitude changes, updating the current altitude by adding the current change and updating the maximum altitude if the current altitude is greater than the maximum altitude.

### Detailed Code Analysis
Let's dive into the code:
```javascript
let altitude = 0;
let maxAltitude = 0;
```
These two variables are initialized to keep track of the current altitude and the maximum altitude encountered so far.
```javascript
for (let i = 0; i < gain.length; i++) {
    altitude += gain[i];
    maxAltitude = Math.max(maxAltitude, altitude);
}
```
This loop iterates over the array of altitude changes. In each iteration, the current altitude is updated by adding the current change (`altitude += gain[i];`). Then, the maximum altitude is updated if the current altitude is greater than the maximum altitude (`maxAltitude = Math.max(maxAltitude, altitude);`).
```javascript
return maxAltitude;
```
Finally, the maximum altitude is returned as the result.

### Code
```javascript
var largestAltitude = function(gain) {
    let altitude = 0;
    let maxAltitude = 0;

    for (let i = 0; i < gain.length; i++) {
        altitude += gain[i];
        maxAltitude = Math.max(maxAltitude, altitude);
    }

    return maxAltitude;
};
```
### Complexity
- **Time:** The time complexity of this approach is O(n), where n is the length of the input array `gain`. This is because the algorithm iterates over the array once.
- **Space:** The space complexity of this approach is O(1), which means the space required does not change with the size of the input array. This is because the algorithm only uses a constant amount of space to store the current altitude and the maximum altitude.

## Real-World Scenarios & Examples
This problem can be applied to various real-world scenarios, such as:
- **GPS Tracking:** A GPS device can track the altitude of a hiker or a vehicle as it moves. The device can use the iterative accumulation approach to calculate the highest altitude reached during the trip.
- **Flight Planning:** An airline can use this approach to determine the highest altitude that an aircraft will reach during a flight. The airline can input the altitude changes at each waypoint and calculate the maximum altitude.
- **Sports Analytics:** The iterative accumulation approach can be used to analyze the performance of athletes in sports that involve altitude changes, such as cycling or cross-country skiing. For example, an analyst can input the altitude changes at each stage of a cycling race and calculate the highest altitude reached by each rider. 

For example, consider a hiker who starts at an altitude of 0 meters and walks through a terrain with the following altitude changes: `[2, 1, -1, 3, -2]`. The highest altitude reached by the hiker can be calculated using the iterative accumulation approach:
- Initial altitude: 0 meters
- Altitude after first change: 0 + 2 = 2 meters
- Altitude after second change: 2 + 1 = 3 meters
- Altitude after third change: 3 - 1 = 2 meters
- Altitude after fourth change: 2 + 3 = 5 meters
- Altitude after fifth change: 5 - 2 = 3 meters
The highest altitude reached by the hiker is 5 meters.