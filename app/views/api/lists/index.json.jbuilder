@lists.each do |list|
    json.set! list.id do
        json.extract! list, :id, :title, :user_id
    end
end
  