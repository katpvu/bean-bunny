@city_businesses.each do |business|
    json.set! business[:business_yelp_id] do 
        json.extract! business, :business_yelp_id, :name, :image_url
    end
end