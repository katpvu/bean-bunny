@list_items.each do |list_item|
    json.set! list_item.id do
        json.extract! list_item, :id, :list_id, :business_yelp_id
    end
end
  