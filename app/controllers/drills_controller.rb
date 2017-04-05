class DrillsController < ApplicationController

  before_action :find_drill, only: [:show, :update, :destroy]

  def index
    if current_user
      @drills = current_user.drills
    else
      render json: {:error => "need to be logged in"}
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def create
    if current_user
      @drill = Drill.new(drill_params)
      if @drill.save
        render json: @drill
      else
        error = @drill.errors.full_messages.collect do |error_message|
          {:error => error_message}
        end
        @errors = {:errors => error}
        render json: @errors, status: 400
      end
    else
      render json: {:error => "need to be logged in"}
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def show
    # find_drill
    render json: @drill, include: @drill.tags
  end

  def update
    # find_drill
  end

  def destroy
    # find_drill
    @drill.destroy
  end

  private

  def find_drill
    @drill = Drill.find(params['id'])
  end

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
