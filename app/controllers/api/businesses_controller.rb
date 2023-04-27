require 'uri'
require 'net/http'
require 'openssl'
require 'json'


class Api::BusinessesController < ApplicationController
    def fetch
        business_id = params[:business_yelp_id]
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

    def create
        if !Business.exists?(business_yelp_id: params[:business_yelp_id])
            @business = Business.new(business_yelp_id: params[:business_yelp_id])
            if @business.save
                head :no_content
            else
                render json: { errors: @business.errors.full_messages}, status: 422
            end
        else
            head :no_content
        end
    end

    private
    def business_params
        params.require(:business).permit(:business_yelp_id)
    end
end
