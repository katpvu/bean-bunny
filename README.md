# Bean Bunny


## Overview
Bean Bunny is a coffee shop finder application that allows you to search for top rated local coffee shops upon searching a given city location. Users are able to add coffee shop businesses to lists that they can quickly reference and view. Business show pages provides users information about their and other Bean Bunny members' thoughts and photos about the business. Any business that a user creates a rating for is viewable in a list named "Hopped" which represents all coffee shops that the current user has been to!


## Technologies Used
### Yelp API
Part of the purpose of the app is to find local coffee shops using user input. I wanted to provide users with real, live data, therefore the Yelp Fusion API was a great tool to integrate for that reason. When the user hits Enter, the user input is converted into a query string using the built-n JavaScript `encodeURIComponent()` function, which is then interpolated into the request to the Yelp API along with fixed query params of searching for specically "coffee shops" within a radius of 6 miles, extracting best matches, and only 20 results. 

```JavaScript
location = params[:location]
url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")
```

### JavaScript Google Maps API
