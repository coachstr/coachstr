class UsersController < ApplicationController

  before_action :find_user, only: [:show, :destroy, :update]

  def show
    # find_user
    render json: @users
  end


  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.signup(@user).deliver
      @user.libraries.create!(title: "My Library")
      render json: @user, serializer: UserExpandedSerializer
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def update
    # find_user
    if @user.update!(user_params)
      render json: @user
    else
      error = @user.errors.full_messages.collect do |error_message|
        {:error => error_message}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def destroy
    # find_user
    @user.destroy
  end

  private

  def user_params
    params.permit(:name, :email, :password, :token)
  end

  def find_user
    @user = User.find_by(token: params['token'])
  end

end
