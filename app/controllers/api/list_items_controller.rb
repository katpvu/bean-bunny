class Api::ListItemsController < ApplicationController
    def index
        @list_items = ListItem.all
        @businesses = @list_items.map do |list_item|
            Business.find_by(business_yelp_id: list_item.business_yelp_id)
        end
        render :index
    end

    def create
        @list_item = ListItem.new(list_item_params)
        if @list_item.save
            render :show
        else
            render json: { errors: ['Coffee shop already exists on this list'] }, status: 422
        end
    end

    def destroy
        @list_item = ListItem.find_by(id: params[:id])
        @list_item.destroy
        head :no_content
    end

    private
    def list_item_params
        params.require(:list_item).permit(:list_id, :business_yelp_id)
    end
end
