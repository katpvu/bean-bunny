class Api::RatingsController < ActionController::API

    wrap_parameters include: Rating.attribute_names + [:photos, :images_to_delete]

    def create 
        db_business = Business.find_by(business_yelp_id: params[:business_yelp_id])
        db_business_id = db_business.id
        params[:rating][:business_id] = db_business_id
        @rating = Rating.new(rating_params)
        if @rating.save
            @rating.photos.attach(params[:rating][:photos]) if params.dig(:rating, :photos).present?
            render :show
        else
            render json: { errors: ['Must submit a rating from 1-5'] }, status: 422
        end
    end

    def update
        # debugger
        db_business = Business.find_by(business_yelp_id: params[:business_yelp_id])
        db_business_id = db_business.id
        params[:rating][:business_id] = db_business_id

        @rating = Rating.find_by(user_id: params[:rating][:user_id], business_id: db_business_id)
        delete_images(params[:images_to_delete]) if params[:images_to_delete].present?
        if @rating.update(rating_params)
            @rating.photos.attach(params[:rating][:photos]) if params.dig(:rating, :photos).present?
            render :show
        else
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
        params.require(:rating).permit(:id, :rating, :notes, :fav_orders, :user_id, :business_id, :images_to_delete)
    end

    def delete_images(image_ids)
        image_ids.each do |img_id|
            image = ActiveStorage::Attachment.find_by_id(img_id)
            image.purge_later
        end
    end
end
