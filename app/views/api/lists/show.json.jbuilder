json.list do
    json.extract! @list, :id, :title, :user_id
end

json.listItems do
    @list.list_items.each do |list_item|
        json.set! list_item.id do
            json.extract! list_item, :id, :business_yelp_id, :list_id
        end
    end
end