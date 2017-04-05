class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.signup(@user).deliver
      session[:user_id] = @user.id
      render json: @user, serializer: UserExpandedSerializer
    else
      render json: @user.errors.full_messages, status: 400
    end
  end


  private

  def user_params
    params.permit(:name, :email, :password)
  end

  def find_user
    @user = User.find_by(params['id'])
  end

end
