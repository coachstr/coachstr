class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      flash[:danger] = "Incorrect credentials. Please try again."
    end
  end

end
