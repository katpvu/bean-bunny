class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
  
    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token
    helper_method :current_user

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken, 
        with: :invalid_authenticity_token

    # CRRLLL
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token]) 
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token! if current_user
        session[:session_token] = nil
        @current_user = nil
    end

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end

    private

    def snake_case_params
    params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    # whenever an invalid authenticity token error is raised, this method will run and render a JSON response
    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
            status: :unprocessable_entity
    end
      
    # any other error raised: this is run 
    def unhandled_error(error)
        # check if req is looking for HTML resp based on its Accepts header; if so, re-raise error
        if request.accepts.first.html?
            raise error
        else # render JSON response containing info about the error using the internal_server_error jbuilder
            # create custom @message and @stack instance vars to use in views
            @message = "#{error.class} - #{error.message}"
            @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
            render 'api/errors/internal_server_error', status: :internal_server_error
            
            #after rendering, use logger.error to log the error message and stack trace in server log
            logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end
end
