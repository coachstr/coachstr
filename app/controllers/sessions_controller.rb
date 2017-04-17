class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      render json: ["You need an account to login"], status: 401
    end
  end

end
