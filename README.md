# Bean Bunny

## Overview
Bean Bunny is a coffee shop finder application that allows you to search for top rated local coffee shops upon searching a given city location. Users are able to add coffee shop businesses to lists that they can quickly reference and view. Business show pages provides users information about their and other Bean Bunny members' thoughts and photos about the business. Any business that a user creates a rating for is viewable in a list named "Hopped" which represents all coffee shops that the current user has been to!

## Aproaches

### Automated Database Business Population Based on User Activity
Because I integrated the Yelp API to fetch real-life businesses and their details, I decided to automate the seeding process based on user activity. There are two phases of seeding:

1. **Initial seeding**: Upon running the command `rails db:setup`, this will seed 20 businesses per specified city fetched from the Yelp API call and create ratings for it. 
2. **User activity seeding**: I have set the searches controller to first check if any business exists in the database with the queried search parameter, which is a city location. 
    + If no business exists for that search query, then it makes a live API call to retrieve 20 businesses. After 20 businesses are succesfully retrieved, another fetch is made to the "Business Details" endpoint for each business, which returns additional information about the business, including more photo urls, price range, business hours, and phone number. Information from these fetches are then used to create a Business object and is persisted into the database, only if the business does not already exist.
    + If businesses exist for that city in the database, it will query and send all business objects with the specified city to the frontend.

Initially, I had designed the database to not store any information about the business, and only relied on the live API calls. However, Bean Bunny is highly dependent on business information, therefore, it was best to store that information in the database and fetch from there when necessary versus fetching live everytime. As a result, this minimized the amount of live API calls to retrieve information, allows for quicker database fetches for businesses that existed, and provides a database rich in real-life businesses that are actually useful for users.

```Ruby
def create
    location = params[:location]
    string_location = location.split("%20").join(" ")

    # If the city has been searched already, redirect to business controller index then fetch from database 
    if Business.select {|business| business.location[:city] == string_location}.count > 0
        redirect_to controller: 'businesses', action: 'index', location: string_location
        return true
    else 
        parsed = yelp_search_by_city(location)

        # Render error when user enters invalid input
        if (parsed[:error])
            render json: {errors: ["Hmm.. try specifying a more exact location"]}, status: :unprocessable_entity
            return false
        else
            @businesses = []
        
            # After live fetching, create business objects and persist them into DB
            parsed[:businesses].each do |business_obj|
                # Another live fetch to Yelp API to retrieve more business details
                parsed_business = yelp_single_business_fetch(business_obj[:id])
                if (parsed_business[:hours])
                    parsed_hours = parsed_business[:hours][0]
                else
                    parsed_hours = {}
                end

                new_business = {
                    business_yelp_id: business_obj[:id],
                    image_url: business_obj[:image_url],
                    coordinates: business_obj[:coordinates],
                    is_closed: business_obj[:is_closed], 
                    location: business_obj[:location],
                    name: business_obj[:name],
                    yelp_rating: business_obj[:rating],
                    additional_photos_urls: parsed_business[:photos],
                    price: parsed_business[:price],
                    hours: parsed_hours,
                    phone_number: parsed_business[:display_phone]
                }

                if !Business.exists?(business_yelp_id:  business_obj[:id])
                    business = Business.create!(new_business)
                end
                
                @businesses << business_obj
            end
            render :index
        end
    end
end

```

### Saving business automates list generation based on city
I decided to automate list creation based on a business's city location to facilitate organizational user experience. Since Bean Bunny only returns coffee shop details, it made sense to sort saved coffee shops into collections that correspond to its location.

Here's an example of how saving a business from San Francisco will automatically generate/add to a San Francisco collection.

<p align="center">
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTAzODZkNTg5YzJhZmUwMWFkZDEwZDliNWM3ODU4OWY1MGJiM2I3NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/11KwOSnzAkLRwm24Ya/giphy.gif" alt="save button" />
</p>

Clicking the 'save' button will first check if the current user has a list titled by the business's exact city. If the current user does not already have a list by that title, this will trigger a dispatch that creates a list for the user, and adds the business as a list item. If the user already has an existing list, then the business is simply added to the list.

`/frontend/src/components/BusinessPage/SaveButton.js`
```JavaScript
const handleAddToList = () => {
    if (sessionUser === null) return history.push("/login");
    if (listsLoaded && !Object.keys(list).length) {
        dispatch(createList({
            userId: sessionUser.id,
            title: business.location.city
        }, businessId))
        .then(() => setSaved(true));
    } else if (Object.keys(list).length) {
        const newListItem = {
            businessYelpId: businessId,
            listId: list.id
        };
        dispatch(createListItem(newListItem))
            .then(() => setSaved(true))
            .then(() => dispatch(fetchListByTitle(business?.location?.city)))
            .catch(async res => {
                let errors = await checkErrors(res);
                setErrors(errors);
            });
      };
};
```

## Technologies Used
### Yelp API
Part of the purpose of the app is to find local coffee shops using user input. I wanted to provide users with real, live data, therefore the Yelp Fusion API was a great tool to integrate for that reason. When the user hits Enter, the user input is converted into a query string using the built-in JavaScript `encodeURIComponent()` function, which is then interpolated into the request to the Yelp API along with fixed query params of searching for specifically "coffee shops" within a radius of 6 miles, extracting best matches, and only 20 results. This API endpoint was limited in the amount of details it returned, therefore, another live call was made to the "Business Details" endpoint, which provides additional photos, business hours, and phone number about a specific business.

```JavaScript
location = params[:location]
url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")
```

### JavaScript Google Maps API
Currently, the maps only display the map marker(s) with an info window hover effect.

### Figma
Designed user interface before implementation to help identify areas of improvement and refine the design to enhance user engagement, satisfaction, and aesthetics.

## Future implementations
1. Sort by system: Users can sort their collections, search results, and hopped list based on ratings or proxity
2. Current location: to automatically search for coffee shops based on the current user's geolocation
3. Liking rating post
4. Get directions from clicking the address

## Asset Attribution
+ All images used for this project were pulled from Yelp.
+ Seeding ratings content was generated using ChatGPT.
