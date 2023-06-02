json.extract! @rating, :id, :notes, :user_id, :business_id, :fav_orders
json.business_yelp_id @rating.business.business_yelp_id
json.photoUrls @rating.photos.map {|file| file.url}
json.photoIds @rating.photos.map {|file| file.id}