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
        # test = response.read_body
        # render json: response.read_body
        # json_response = JSON.parse(response.body)
        # object = self.as_json.with_indifferent_access
        parsed = JSON.parse response.read_body, symbolize_names: true
        @businesses = []
        
        p parsed
        parsed[:businesses].each do |business_obj|
            @businesses << business_obj
        end

        
        render :index
        # @businesses = @response[:businesses]
        # render json: @businesses
        # render json: response.read_body


    end


end