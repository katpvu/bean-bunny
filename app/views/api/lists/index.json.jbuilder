@lists.each do |list|
    numListItems = list.list_items.count
    json.set! list.id do
        json.extract! list, :id, :title, :user_id
        json.listItemBusinesses do
            json.array! list.list_items.pluck(:business_yelp_id)
        end
        json.numListItems numListItems
    end
end
  