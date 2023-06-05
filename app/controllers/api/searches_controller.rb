require 'uri'
require 'net/http'
require 'openssl'
require 'json'


class Api::SearchesController < ApplicationController
    def create
        location = params[:location]
        string_location = location.split("%20").join(" ")

        # If the city has been searched already, redirect to business controller index then fetch from database 
        if Business.select {|business| business.location[:city] == string_location}.count > 0
            redirect_to controller: 'businesses', action: 'index', location: string_location
            return true
        else 
            parsed = yelp_search_by_city(location)

            # Render error when user enters invalid input
            if (parsed[:error])
                render json: {errors: ["Hmm.. try specifying a more exact location"]}, status: :unprocessable_entity
                return false
            else
                @businesses = []
            
                # After live fetching, create business objects and persist them into DB
                parsed[:businesses].each do |business_obj|
                    # Another live fetch to Yelp API to retrieve more business details
                    parsed_business = yelp_single_business_fetch(business_obj[:id])
                    if (parsed_business[:hours])
                        parsed_hours = parsed_business[:hours][0]
                    else
                        parsed_hours = {}
                    end
    
                    new_business = {
                        business_yelp_id: business_obj[:id],
                        image_url: business_obj[:image_url],
                        coordinates: business_obj[:coordinates],
                        is_closed: business_obj[:is_closed], 
                        location: business_obj[:location],
                        name: business_obj[:name],
                        yelp_rating: business_obj[:rating],
                        additional_photos_urls: parsed_business[:photos],
                        price: parsed_business[:price],
                        hours: parsed_hours,
                        phone_number: parsed_business[:display_phone]
                    }
    
                    if !Business.exists?(business_yelp_id:  business_obj[:id])
                        business = Business.create!(new_business)
                    end
                    
                    @businesses << business_obj
                end
                render :index
            end
        end
    end

    def recs
        current_bus = Business.find_by(business_yelp_id: params[:business_yelp_id])
        city = current_bus.location[:city]
        @city_businesses = Business.order("RANDOM()").select {|business| business.location[:city] == city && business.business_yelp_id != params[:business_yelp_id]}.take(3)
        render :recs
    end

    private
    def yelp_single_business_fetch(yelp_id)
        url = URI("https://api.yelp.com/v3/businesses/#{yelp_id}")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        return JSON.parse response.read_body, symbolize_names: true
    end

    def yelp_search_by_city(location)
        url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        return JSON.parse response.read_body, symbolize_names: true
    end
end