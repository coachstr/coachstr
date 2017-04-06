class ApplicationController < ActionController::Base
  # protect_from_forgery unless: -> { request.format.json? }

  def static
    render html: File.open("#{Rails.root}/public/index.html").read.html_safe, status: 200
  end


  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_user
    unless current_user
      render json: {:error => "You need to be logged in"}
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

end
