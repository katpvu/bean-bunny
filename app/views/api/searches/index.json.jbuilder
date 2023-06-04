@businesses.each do |business|
    json.set! business[:id] do 
        json.extract! business, :id, :name, :coordinates, :rating, :location, :image_url, :is_closed
        json.yelp_rating business[:rating]
        json.business_yelp_id business[:id]
    end
end