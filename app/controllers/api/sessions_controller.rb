class Api::SessionsController < ApplicationController
    # retrieving current user GET '/api/session'
    def show
        if current_user
            @user = current_user
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    # logging in a user POST '/api/session'
    def create
        username = params[:username]
        password = params[:password]
        # debugger
        @user = User.find_by_credentials(username, password)
        if @user
            login!(@user)
            render 'api/users/show'
        else 
            render json: { errors: ['Invalid username or password'] }, status: :unauthorized
        end
    end


    # logging out a user DELETE 'api/session/'
    def destroy
        logout!
        # head :no_content
        render json: { message: 'success' }
    end

end
