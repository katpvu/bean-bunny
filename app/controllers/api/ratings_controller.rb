class Api::RatingsController < ActionController::API

    wrap_parameters include: Rating.attribute_names + [:photos]

    def index
        @ratings = Ratings.all
    end

    def show
        @rating = Rating.find(params[:id])
    end

    def create 
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

    def update
        # debugger
        db_business = Business.find_by(business_yelp_id: params[:business_yelp_id])
        db_business_id = db_business.id
        params[:rating][:business_id] = db_business_id
        @rating = Rating.find_by(id: params[:id])
        if @rating.update(rating_params)
            render :show
        else
            puts errors: @rating.errors.full_messages
            render json: { errors: @rating.errors.full_messages}, status: 422
        end
    end

    def destroy
        @rating = Rating.find_by(id: params[:id])
        @rating.destroy
        head :no_content
    end

    private
    def rating_params
        params.require(:rating).permit(:id, :rating, :notes, :fav_orders, :user_id, :business_id, photos: [])
    end

end
