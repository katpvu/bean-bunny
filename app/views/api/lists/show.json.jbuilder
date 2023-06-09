json.list do
    json.extract! @list, :id, :title, :user_id
    json.listItemBusinesses do
        json.array! @list.list_items.pluck(:business_yelp_id)
    end
end

json.listItems do
    @list.list_items.each do |list_item|
        business = Business.find_by(business_yelp_id: list_item.business_yelp_id)
        json.set! list_item.id do
            json.extract! list_item, :id, :business_yelp_id, :list_id
            json.extract! business,  :name, :image_url, :coordinates, :location, :is_closed, :yelp_rating
        end
    end
end