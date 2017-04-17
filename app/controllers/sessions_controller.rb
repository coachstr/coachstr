class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

end
