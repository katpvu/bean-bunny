json.extract! @rating, :id, :notes, :user_id, :business_id, :fav_orders
json.photoUrls @rating.photos.map {|file| file.url}