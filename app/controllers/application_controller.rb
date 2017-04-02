class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  def static
    render html: File.open("#{Rails.root}/public/index.html").read.html_safe, status: 200
  end
end
