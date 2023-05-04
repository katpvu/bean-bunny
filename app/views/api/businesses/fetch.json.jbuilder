json.business do
    json.extract! @business, :id, :name, :coordinates, :rating, :location, :image_url, :is_closed 
end

json.ratings do
    @db_business.ratings.each do |rating|
        json.set! rating.id do
            json.extract! rating, :id, :notes, :rating, :fav_orders, :user_id, :business_id
            json.businessYelpId rating.business.business_yelp_id
            json.photoUrls rating.photos.map {|file| file.url}
        end
    end
end