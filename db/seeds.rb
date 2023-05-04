# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

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

    puts "Creating lists.."
    san_francisco = List.create!(
      title: 'San Francisco',
      user_id: demo.id
    )

    los_angeles = List.create!(
      title: 'Los Angeles',
      user_id: demo.id
    )

    new_york = List.create!(
      title: 'New York',
      user_id: demo.id
    )

    puts "Creating list items..."
    sf_businesses = [
      'DaOQgNk4LjN2gbvYrLQGvA',
      '-NbDKVqG170J19MqSQ5q_A'
    ]

    sf_businesses.each do |bus_id|
      ListItem.create(
        list_id: san_francisco.id,
        business_yelp_id: bus_id
      )
    end

    ny_businesses = [
      'pimuUR-TEHIjUla3S3jemQ',
      'ED7A7vDdg8yLNKJTSVHHmg',
      'K6fkejf2ZBUdlsVrm5RbrA',
      'jZZMmT7Mk3S-fNjXcq3Ksg',
      'xpDp5zKQJHu7Ljgs1PKLJw'
    ]

    ny_businesses.each do |bus_id|
      ListItem.create(
        list_id: new_york.id,
        business_yelp_id: bus_id
      )
    end

    la_businesses = [
      'gnRQ4d8RdMpr0wbhVBjEng',
      'ZxFQnp-PidPRTf23Ss_ecA',
      'KWuSIrgx9fx2m8JuqknZPA',
      '4E7EsJwJ1wsiA4RRBJ3wBQ'
    ]

    la_businesses.each do |bus_id|
      ListItem.create(
        list_id: los_angeles.id,
        business_yelp_id: bus_id
      )
    end

    
    business_ids = sf_businesses + la_businesses + ny_businesses
    business_object_ids = []
    puts "Creating businesses..."
    business_ids.each do |business_id|
      business = Business.create!(business_yelp_id: business_id)
      business_object_ids << business.id
    end

    #demo user ratings
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
  
    puts "Done!"
  # end