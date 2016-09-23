# RentalPricingSystem
System to determine optimal rental pricing 



rentalpricingsystem.herokuapp.com 

Methodology 
To create the pricing system, I decided to use a median value over an average value because of potential outliers. A median value would be a more accurate view of the market (in this case, the data set) because it is less likely to be affected by outliers and large deviations.  

Developing the pricing strategy, I computed the median price per sqft based on the number of bedrooms in the house. I decided to only factor in the bedroom size because most houses have a standard on how many beds/baths are in a house and the assumption is that if a house has an excessive amount of bedrooms/bathrooms (example: 10 bedrooms, 15 bathrooms), it is most likely an outlier. There are seven categories: Studios, 1 Bedrooms, 2 Bedrooms, 3 Bedrooms, 4 Bedrooms, 5 Bedrooms, 6 or More Bedrooms. For each category, I calculuated the median price per square feet, and using that median price per square feet, I calculated the rental price for that particular home by its square footage. The margin of error with this calculation is already small, but with more data points, the margin of error will only decrease and become more and more reflective of the market.

Technologies used: HTML/Bootstrap, Angular.js, Node.js/Express.js
