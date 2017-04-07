class ApplicationController < ActionController::Base
  # protect_from_forgery unless: -> { request.format.json? }

  def static
    render html: File.open("#{Rails.root}/public/index.html").read.html_safe, status: 200
  end


  private

  def current_user
    @current_user ||= User.find_by(token: params[:token]) if params[:token]
  end

  def require_user
    unless current_user
      error = {:error => "You need to be logged in"}
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

end
