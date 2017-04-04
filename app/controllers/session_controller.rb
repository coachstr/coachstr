class SessionController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      flash[:danger] = "Incorrect credentials. Please try again."
    end
  end

end
