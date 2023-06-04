@businesses.each do |business|
    json.set! business[:business_yelp_id] do 
        json.extract! business, :id, :business_yelp_id, :name, :coordinates, :yelp_rating, :location, :image_url, :is_closed
    end
end