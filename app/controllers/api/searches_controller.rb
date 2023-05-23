require 'uri'
require 'net/http'
require 'openssl'
require 'json'


class Api::SearchesController < ApplicationController
    # create a new search, fetch data from API, render json jbuilder to return specific information
    def create
        #may potentially want to search based on map zoom (lat and lng)
        location = params[:location]
        url = URI("https://api.yelp.com/v3/businesses/search?location=#{location}&term=coffee%20shop&radius=10000&&sort_by=best_match&limit=20")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["accept"] = "application/json"
        request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"

        response = http.request(request)
        parsed = JSON.parse response.read_body, symbolize_names: true
        @businesses = []
    
        parsed[:businesses].each do |business_obj|
            p business_obj
            puts
            # new_business = {
            #     business_yelp_id: business_obj[:id],
            #     image_url: business_obj[:image_url],
            #     coordinates: business_obj[:coordinates],
            #     is_closed: business_obj[:is_closed], 
            #     location: business_obj[:location],
            #     name: business_obj[:name],
            #     yelp_rating: business_obj[:rating]
            # }
            # p new_business
            @businesses << business_obj
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