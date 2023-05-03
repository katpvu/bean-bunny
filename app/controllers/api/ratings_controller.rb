class Api::RatingsController < ActionController::API

    wrap_parameters include: Rating.attribute_names + [:photos]

    def index
        @ratings = Ratings.all
    end

    def show
        @rating = Rating.find(params[:id])
    end

    def create 
        debugger
        db_business = Business.find_by(business_yelp_id: params[:business_yelp_id])
        db_business_id = db_business.id
        params[:rating][:business_id] = db_business_id
        @rating = Rating.new(rating_params)

        if @rating.save
            render :show
        else
            render json: { errors: @rating.errors.full_messages }, status: 422
        end
    end

    private
    def rating_params
        params.require(:rating).permit(:rating, :notes, :fav_orders, :user_id, :business_id, photos: [])
    end

end
