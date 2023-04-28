@businesses.each do |business|
    json.set! business[:id] do 
        json.extract! business, :id, :name, :coordinates, :rating, :location, :image_url, :is_closed
    end
end