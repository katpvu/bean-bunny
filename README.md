# Bean Bunny


## Overview
Bean Bunny is a coffee shop finder application that allows you to search for top rated local coffee shops upon searching a given city location. Users are able to add coffee shop businesses to lists that they can quickly reference and view. Business show pages provides users information about their and other Bean Bunny members' thoughts and photos about the business. Any business that a user creates a rating for is viewable in a list named "Hopped" which represents all coffee shops that the current user has been to!

## Aproaches

### Automated Database Business Population Based on User Activity
Because I integrated the Yelp API to fetch real-life businesses and their details, I decided to automate the seeding process based on user activity. There are two phases of seeding:

    1. Initial seeding: Upon running the command `rails db:setup`, this will seed 20 businesses per specified city fetched from the Yelp API call and create ratings for it. 
    2. User activity seeding: I have set the searches controller to first check if any business exists in the database with the queried search parameter, which is a city location. 
        + If no business exists for that search query, then it makes a live API call to retrieve 20 businesses. After 20 businesses are succesfully retrieved, another fetch is made to the "Business Details" endpoint for each business, which returns additional information about the business, including more photo urls, price range, business hours, and phone number. Information from these fetches are then used to create a Business object and is persisted into the database, only if the business does not already exist.
        + If businesses exist for that city in the database, it will query and send all business objects with the specified city to the frontend.

Initially, I had designed the database to not store any information about the business, and only relied on the live API calls. However, Bean Bunny is highly dependent on business information, therefore, it was best to store that information in the database and fetch from there when necessary versus fetching live everytime. As a result, this minimized the amount of live API calls to retrieve information, allows for quicker database fetches for businesses that existed, and provides a database rich in real-life businesses that are actually useful for users.


## Technologies Used
### Yelp API
Part of the purpose of the app is to find local coffee shops using user input. I wanted to provide users with real, live data, therefore the Yelp Fusion API was a great tool to integrate for that reason. When the user hits Enter, the user input is converted into a query string using the built-n JavaScript `encodeURIComponent()` function, which is then interpolated into the request to the Yelp API along with fixed query params of searching for specically "coffee shops" within a radius of 6 miles, extracting best matches, and only 20 results. 

```JavaScript
location = params[:location]
url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")
```

### JavaScript Google Maps API
