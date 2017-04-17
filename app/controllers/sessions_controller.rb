class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      if @user.errors.exists?
        error = @user.errors.full_messages.collect do |error_message|
          {:error => error_message}
        end
      else
        {:error => "You need an account to login"}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

end
