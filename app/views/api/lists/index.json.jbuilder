@lists.each do |list|
    numListItems = list.list_items.count
    json.set! list.id do
        json.extract! list, :id, :title, :user_id
        json.numListItems numListItems
    end
end
  