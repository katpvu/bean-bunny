@list_items.each do |list_item|
    json.set! list_item.id do
        json.extract! list_item, :id, :list_id, :business_yelp_id
    end
end


@businesses.each do |business|
    json.set! buisness.id do
        json.extract! business, :id, :business_yelp_id, :name, :location, :image_url, :coordinates, :is_closed, :yelp_rating
    end
end