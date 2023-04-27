# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating demo user..."
    demo = User.create!(
      username: 'demobunny', 
      email: 'demobunny@user.io',
      password: 'password'
    )

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

    
    # ListItem.create(
    #   list_id: san_francisco.id,
    #   business_yelp_id: 'DaOQgNk4LjN2gbvYrLQGvA'
    # )

    # ListItem.create(
    #   list_id: san_francisco.id,
    #   business_yelp_id: '-NbDKVqG170J19MqSQ5q_A'
    # )

    # ListItem.create(
    #   list_id: los_angeles.id,
    #   business_yelp_id: 'gnRQ4d8RdMpr0wbhVBjEng'
    # )

    # ListItem.create(
    #   list_id: los_angeles.id,
    #   business_yelp_id: 'ZxFQnp-PidPRTf23Ss_ecA'
    # )

    # ListItem.create(
    #   list_id: los_angeles.id,
    #   business_yelp_id: 'KWuSIrgx9fx2m8JuqknZPA'
    # )

    # ListItem.create(
    #   list_id: los_angeles.id,
    #   business_yelp_id: '4E7EsJwJ1wsiA4RRBJ3wBQ'
    # )
    
    business_ids = sf_businesses + la_businesses + ny_businesses

    puts "Creating businesses.."
    business_ids.each do |business_id|
      Business.create!(business_yelp_id: business_id)
    end
    # Business.create!(
    #   business_yelp_id: 'DaOQgNk4LjN2gbvYrLQGvA'
    # )

    # Business.create!(
    #   business_yelp_id: '-NbDKVqG170J19MqSQ5q_A'
    # )

    # Business.create!(
    #   business_yelp_id: '4E7EsJwJ1wsiA4RRBJ3wBQ'
    # )

    # Business.create!(
    #   business_yelp_id: 'KWuSIrgx9fx2m8JuqknZPA'
    # )

    # Business.create!(
    #   business_yelp_id: 'ZxFQnp-PidPRTf23Ss_ecA'
    # )

    # Business.create!(
    #   business_yelp_id: 'gnRQ4d8RdMpr0wbhVBjEng'
    # )
  
    
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     password: 'password'
    #   }) 
    # end
  
    puts "Done!"
  end