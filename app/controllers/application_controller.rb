class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  helper_method :current_user

  def static
    render html: File.open("#{Rails.root}/public/index.html").read.html_safe, status: 200
  end


  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
