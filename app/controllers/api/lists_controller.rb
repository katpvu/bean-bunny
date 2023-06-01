class Api::ListsController < ApplicationController
    def index
        # debugger
        @lists = List.where(user_id: current_user.id)
        render :index
    end

    def show
        @list = List.find_by(id: params[:id])
        render :show
    end

    def fetch_by_title
        @list = List.find_by(title: params[:title])
        if @list
            render :show
        else
            render json: {}
        end
    end

    def create
        @list = List.new(list_params);
        @list.user_id = current_user.id
        if @list.save
            render :show
        else
            render json: { errors: @list.errors.full_messages }, status: 422
        end
    end

    def update
        @list = List.find_by(id: params[:id]);
        if @list.update(list_params)
            render :show
        else
            render json: { errors: @list.errors.full_messages }, status: 422
        end
    end

    def destroy
        @list = List.find_by(id: params[:id])
        @list.destroy
        head :no_content
    end

    private
    def list_params
        params.require(:list).permit(:title, :user_id)
    end
end
