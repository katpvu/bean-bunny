require 'uri'
require 'net/http'
require 'openssl'
require 'json'


class Api::SearchesController < ApplicationController
    def create
        location = params[:location]

        # If the city has been searched already, then fetch from database
        allBusinesses = Business.all
        cityBusinesses = allBusinesses.select {|business| business.location[:city] == location}
        if cityBusinesses.length > 0 
            @businesses = cityBusinesses
        else 
            # Else, do a live fetch from yelp API
            url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")

            http = Net::HTTP.new(url.host, url.port)
            http.use_ssl = true

            request = Net::HTTP::Get.new(url)
            request["accept"] = "application/json"
            request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

            response = http.request(request)
            parsed = JSON.parse response.read_body, symbolize_names: true
            @businesses = []
        
            # After live fetching, create business objects and persist them into DB
            parsed[:businesses].each do |business_obj|
                new_business = {
                    business_yelp_id: business_obj[:id],
                    image_url: business_obj[:image_url],
                    coordinates: business_obj[:coordinates],
                    is_closed: business_obj[:is_closed], 
                    location: business_obj[:location],
                    name: business_obj[:name],
                    yelp_rating: business_obj[:rating]
                }

                if !Business.exists?(business_yelp_id:  business_obj[:id])
                    business = Business.create!(new_business)
                end
                
                @businesses << business_obj
            end
        end
        
        # p parsed
        render :index
    end

    def show
        business_id = params[:business_id]
        url = URI("https://api.yelp.com/v3/businesses/#{business_id}")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        @business = JSON.parse response.read_body, symbolize_names: true

        render :show
    end


end