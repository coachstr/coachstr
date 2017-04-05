class DrillsController < ApplicationController

  def index
    if current_user
      @notes = current_user.drills
    else
      @notes = {error: "You must be logged in to view drills."}
    end
    render json: @notes
  end


  def create
    if current_user
      
  end



  private

  def drill_params
    params[:user_id] = User.find_by(token: params[:token]).id

    pre_drill_params = params.permit(:title,
                             :description,
                             :duration,
                             :tags,
                             :user_id,
                             :default_avatar,
                             :drill_pic)
    tags = Array.new
    pre_drill_params[:tags].split(%r{,\s*}).each do |name|
      tags << Tag.find_or_create_by(name: name)
    end
    pre_drill_params[:tags] = tags
    return pre_drill_params
  end

  end

end
