json.business do
    json.extract! @business, :id, :business_yelp_id, :name, :location, :coordinates, :yelp_rating, :is_closed, :image_url
end

json.ratings do
    @business.ratings.each do |rating|
        json.set! rating.id do
            json.extract! rating, :id, :notes, :user_id, :business_id, :fav_orders, :rating
            json.business_yelp_id rating.business.business_yelp_id
            json.photoUrls rating.photos.map {|file| file.url}
        end
    end
end


