class Api::UsersController < ApplicationController
    # password is not technically a User attribute. override what keys you want Rails to automatically nest using wrap_parameters
    wrap_parameters include: User.attribute_names + ['password']

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
        # render json: user_params
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @users = User.all
        render :index
    end


    private
    def user_params
        params.require(:user).permit(:username, :password, :email)
    end
end
