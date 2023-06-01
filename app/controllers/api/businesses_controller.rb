require 'uri'
require 'net/http'
require 'openssl'
require 'json'


class Api::BusinessesController < ApplicationController
    #fetch all businesses based on location
    def index 
        @businesses = Business.select {|business| business.location[:city] == params[:location] }
        render :index
    end 

    def create
        if !Business.exists?(business_yelp_id: params[:business_yelp_id])
            @business = Business.new(business_params)
            if @business.save
                head :no_content
            else
                render json: { errors: @business.errors.full_messages}, status: 422
            end
        else
            head :no_content
        end
    end

    def show
        # debugger
        @business = Business.find_by(business_yelp_id: params[:id])
        render :show
    end

    private
    def business_params
        params.require(:business).permit(
            :business_yelp_id, 
            :image_url,
            :is_closed, 
            :name, 
            :yelp_rating, 
            :additional_photos_urls,
            :price,
            :hours,
            :phone_number,
            coordinates: [:latitude, :longitude],  
            location: [:address1, :address2, :address3, :city, :zip_code, :country, :state, :display_address]
        )
    end
end
