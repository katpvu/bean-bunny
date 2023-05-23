json.user do
    json.extract! @user, :id, :username
end

json.businessesRated do 
    @user.businesses_rated.each do |business|
        json.set! business.id do
            json.extract! business, :id, :business_yelp_id, :name, :location, :coordinates, :yelp_rating, :is_closed, :image_url
        end
    end
end

json.ratings do
    @user.ratings.each do |rating|
        json.set! rating.id do
            json.extract! rating, :id, :notes, :user_id, :business_id, :fav_orders, :rating
            json.business_yelp_id rating.business.business_yelp_id
            json.photoUrls rating.photos.map {|file| file.url}
        end
    end
end