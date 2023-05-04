json.user do
    json.extract! @user, :id, :username
end

json.businessesRated do 
    @user.businesses_rated.each do |business|
        json.set! business.id do
            json.extract! business, :id, :business_yelp_id
        end
    end
end