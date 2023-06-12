@lists.each do |list|
    num_list_items = list.list_items.count
    business_id = list.list_items.first.business_yelp_id
    business = Business.find_by(business_yelp_id: business_id)
    collection_image = business.image_url
    json.set! list.id do
        json.extract! list, :id, :title, :user_id
        json.listItemBusinesses do
            json.array! list.list_items.pluck(:business_yelp_id)
        end
        json.num_list_items num_list_items
        json.collection_image collection_image
    end
end
  