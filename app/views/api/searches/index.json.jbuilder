@businesses.each do |business|
    json.set! business[:id] do 
        json.extract! business, :id, :name, :coordinates, :rating, :location, :image_url
    end
end