class Api::ListsController < ApplicationController
    def index
        @lists = List.where(user_id: current_user.id)
        render :index
    end

    def show
    end

    def create
        @list = List.new(list_params);
        if @list.save
            render :show
        else
            render json: { errors: @list.errors.full_messages }, status: 422
        end
    end

    def update
    end

    def destroy
        @list = List.find_by(id: params[:id]);
        @list.destroy
        head :no_content
    end

    private
    def list_params
        params.require(:list).permit(:title, :user_id)
    end
end
