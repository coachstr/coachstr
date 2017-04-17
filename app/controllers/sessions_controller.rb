class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
        error_message = "You need an account to login"
        {:error => error_message}
        @errors = {:errors => error}
        render json: @errors, status: 401
    end
  end

end
