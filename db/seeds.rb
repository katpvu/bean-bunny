# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"
require 'faker'
require 'uri'
require 'net/http'
require 'openssl'
require 'json'

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    List.destroy_all
    ListItem.destroy_all
    Business.destroy_all
    Rating.destroy_all

    puts 'Destroying all ActiveStorage attachments'
    ActiveStorage::Attachment.all.each { |attachment| attachment.purge }
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

    # businesses = {
    #   "San Francisco" => [],
    #   "Los Angeles" => [],
    #   "New York City" => []
    # }
    businesses = {};
    # cities = ["San Francisco", "New York City" , "Los Angeles"]
  
    puts "Creating demo user..."
    demo = User.create!(
      username: 'demobunny', 
      email: 'demobunny@user.io',
      password: 'password'
    )

    puts "Creating dummy users..."
    users_arr = []
    10.times do 
      users_arr << User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating businesses..."
    cities = ["New York City", "San Francisco", "Los Angeles"]
    cities_for_lists = []
    
    def yelp_search_by_city(location)
        url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        return JSON.parse response.read_body, symbolize_names: true
    end

    def yelp_single_business_fetch(yelp_id)
        url = URI("https://api.yelp.com/v3/businesses/#{yelp_id}")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        return JSON.parse response.read_body, symbolize_names: true
    end

    cities.each do |city|
      parsed_searches = yelp_search_by_city(city)
      parsed_searches[:businesses].each_with_index do |business_obj, i|
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
        new_bus = Business.create!(new_business)
        if businesses[business_obj[:location][:city]] && ( i % 2 == 0)
          businesses[business_obj[:location][:city]] << business_obj[:id]
        elsif !businesses[city] && (i % 2 == 0)
          businesses[business_obj[:location][:city]] = [business_obj[:id]]
          cities_for_lists << city
        end
      end
    end


    puts "Creating lists and list items..."
    def createListItems(listId, city, businesses)
      businesses[city].each do |business_id|
        ListItem.create(
          list_id: listId,
          business_yelp_id: business_id
        )
      end
    end

    businesses.keys.each do |city|
      list = List.create(
        title: city,
        user_id: demo.id
      )
      createListItems(list.id, city, businesses)
    end

    # demo user's ratings
    business_object_ids = Business.order("RANDOM()").limit(11).pluck(:id)

    puts "Creating ratings..."
    rating_notes = [  
      "Amazing coffee and service!",  
      "Cozy and inviting atmosphere.",  
      "Great place to work remotely.",  
      "Incredible latte art!",  
      "Friendly staff and great music.",  
      "The iced coffee is so refreshing!",  
      "Love the avocado toast!",  
      "Fast Wi-Fi and plenty of outlets.",  
      "Delicious cold brew selection.",  
      "High-quality beans make all the difference.",  
      "Awesome outdoor seating area!"
    ]
    rating_ratings = [4, 5, 4, 5, 5, 4, 5, 4, 5, 4, 4]
    rating_fav_orders = [  
      "Medium drip coffee with a splash of almond milk.",  
      "Double shot espresso with a dash of cinnamon.",  
      "Iced latte with oat milk and a shot of caramel.",  
      "Americano with a pump of hazelnut syrup.",  
      "Chai tea latte with honey and a sprinkle of nutmeg.", 
      "Cappuccino with extra foam and a drizzle of chocolate.",  
      "Cold brew with a splash of coconut milk and a pinch of cinnamon.",  
      "Matcha latte with oat milk and honey.",  
      "Decaf latte with a shot of vanilla syrup.",  
      "Espresso macchiato with a twist of lemon.",  
      "Iced mocha with whipped cream and chocolate shavings."
    ]

    i = 0
    while i < 11 
      rating = Rating.create!(
        user_id: demo.id,
        business_id: business_object_ids[i],
        rating: rating_ratings[i],
        notes: rating_notes[i],
        fav_orders: rating_fav_orders[i],
      )
      rating.photos.attach(
        io: URI.open("https://bean-bunny-seeds.s3.us-west-1.amazonaws.com/bb-seed-photos/bb-seed-photos/beanbunny-#{i}.jpg"),
        filename: "beanbunny-#{i}.jpg"
      )
      i += 1
    end

    # dummy users ratings
    dummy_rating_notes = [  
      "This coffee shop is a hidden gem!",  
      "The pastries here are absolutely divine.",  
      "Always love the latte art here.",  
      "Great place to catch up with friends.",  
      "The staff are always so friendly and welcoming.",  
      "The atmosphere here is so cozy and inviting.",  
      "Love the music they play here.",  
      "The cold brew is my new addiction.",  
      "This is my go-to spot for a morning pick-me-up.",  
      "The attention to detail here is amazing!",
      "The coffee here is consistently great.",  
      "Love the atmosphere and decor.",  
      "Great spot for a quick caffeine fix.",  
      "The latte I had was the perfect balance of espresso and milk.",  
      "The outdoor seating area is a lovely spot to relax and people watch.",  
      "The baristas here are talented and friendly.",  
      "Always a pleasure to stop by this coffee shop.",  
      "The prices here are reasonable and the quality is top-notch.",  
      "This coffee shop has become my favorite study spot.",  
      "The cold brew here is a game changer!"
    ]

    dummy_rating_ratings = [4, 5, 5, 4, 4, 5, 5, 4, 5, 5]
    dummy_rating_fav_orders = [  
      "Iced coffee with a shot of vanilla syrup and a splash of cream.",  
      "Green tea latte with soy milk and a drizzle of honey.",  
      "Medium drip coffee with a dash of cinnamon and nutmeg.",  
      "Double shot macchiato with caramel syrup and whipped cream.",  
      "Espresso with a dollop of whipped cream and a sprinkle of cocoa powder.",  
      "Chai tea latte with coconut milk and a shot of vanilla syrup.",  
      "Iced matcha latte with almond milk and a scoop of protein powder.",  
      "Cappuccino with extra foam and a dash of vanilla powder.",  
      "Americano with a shot of peppermint syrup and a splash of cream.",  
      "Hot chocolate with whipped cream and a sprinkle of cinnamon.",
      "Iced caramel macchiato with almond milk and extra caramel drizzle.",  
      "Hot espresso with a splash of cream and a dash of cinnamon.",  
      "Decaf latte with a shot of sugar-free vanilla syrup.",  
      "Double shot espresso with a drop of honey and a sprinkle of sea salt.",  
      "Chai tea latte with a shot of spiced rum syrup and whipped cream.",  
      "Iced coffee with a shot of hazelnut syrup and a splash of milk.",  
      "Matcha latte with oat milk and a shot of lavender syrup.",  
      "Cappuccino with a dusting of cocoa powder and a shot of caramel.",  
      "Americano with a pump of white chocolate syrup and a splash of cream.",  
      "Mocha with a shot of peppermint syrup and whipped cream."
    ]
    
    users_arr.each_with_index do |user, index|
      rating = Rating.create!(
        user_id: user.id,
        business_id: business_object_ids[index],
        rating: dummy_rating_ratings[index],
        notes: dummy_rating_notes[index],
        fav_orders: dummy_rating_fav_orders[index],
      )
      rating.photos.attach(
        io: URI.open("https://bean-bunny-seeds.s3.us-west-1.amazonaws.com/beanbunny-#{index+11}.jpg"),
        filename: "beanbunny-#{index + 11}.jpg"
      )
    end

    

    #dummy users bad ratings
    dummy_bad_ratings = {
      3 => [ "Decent coffee, but nothing exceptional.",  
            "Average service, nothing to complain about but nothing to praise either.",  
            "The ambiance was okay, neither cozy nor particularly inviting.",  
            "Reasonably priced drinks, but lacked a wow factor.",  
            "Decent selection of pastries, but nothing extraordinary.",  
            "The baristas were friendly, but seemed a bit inexperienced.",  
            "The coffee shop had a relaxed atmosphere, but could use some improvements.",  
            "The coffee tasted fine, but it didn't leave a lasting impression.",  
            "The seating was comfortable enough, but could be more spacious.",  
            "Overall, an okay coffee shop experience, but I've had better elsewhere."],
      2 => [ "Subpar coffee with a bitter aftertaste.",  
            "Poor service, staff seemed disinterested and inattentive.",  
            "The ambiance was lackluster, felt more like a cafeteria than a cozy coffee shop.",  
            "Overpriced drinks that did not live up to the cost.",  
            "Limited and unimpressive selection of pastries.",  
            "The baristas lacked basic coffee-making skills and knowledge.",  
            "Uncomfortable seating and outdated furniture.",  
            "The coffee tasted watered down and weak.",  
            "Chaotic atmosphere and long wait times.",  
            "Overall, a disappointing coffee shop experience that I won't be returning to."], 
      1 => [ "The coffee had an unpleasant taste, not to my liking.",
            "The service was lacking, and the staff could benefit from more friendliness and attentiveness.",
            "The ambiance could use improvement to create a more comfortable and inviting atmosphere.",
            "The drinks were overpriced compared to the quality and value provided.",
            "The selection of pastries was limited and could be more appealing.",
            "The baristas seemed to struggle with consistency and could benefit from additional training.",
            "The seating area was not as clean and tidy as expected, which affected the overall experience.",
            "The coffee lacked flavor and depth, leaving much to be desired.",
            "There were delays and disorganization that impacted the overall efficiency of the service.",
            "This coffee shop fell short of my expectations and left me disappointed."]
    }
    business_object_ids = Business.order("RANDOM()").limit(30).pluck(:id)

    until dummy_bad_ratings.values.flatten.length === 0
      users_arr.each_with_index do |user, index|
        return false if dummy_bad_ratings.values.flatten.length === 0 
        randomRating = rand(1..3)
        randomBusinessId = business_object_ids[rand(30)]
        ratingNotes = dummy_bad_ratings[randomRating]
        return false if Rating.exists?(user_id: user.id, business_id: randomBusinessId)

        rating = Rating.new(
          user_id: user.id,
          business_id: randomBusinessId,
          rating: randomRating,
          notes: ratingNotes.last
        )
        if rating.save
          dummy_bad_ratings[randomRating].pop
        end
      end
    end

    
    puts "Done!"
  # end