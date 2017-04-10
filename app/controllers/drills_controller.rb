class DrillsController < ApplicationController
  before_action :find_drill, only: [:show, :update, :destroy]
  before_action :require_user, only: [:index, :create, :update, :destroy]

  def index
    # binding.pry
    @drills = current_user.drills
    render json: @drills
  end

  def create
    @drill = Drill.new(drill_params)
    if @drill.save
      @drill.update!(after_save_params)
      render json: @drill
    else
      error = @drill.errors.full_messages.collect do |error_message|
        {:error => error_message}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def show
    # binding.pry
    # find_drill
    render json: @drill
  end

  def update
    # find_drill
    if @drill.update!(drill_params)
      render json: @drill
    else
      error = @drill.errors.full_messages.collect do |error_message|
        {:error => error_message}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
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
    params[:user_id] = current_user.id

    params.permit(#:token,
                 :title,
                 :description,
                 :duration,
                 :user_id,
                 :default_avatar,
                 :drill_pic)
  end


  def after_save_params
    pre_drill_params = params.permit(
                              :tags => [],
                              :plans => [],
                              :libraries => []
    )

    # tag list
    if params[:tags].blank?
      pre_drill_params[:tags] = []
    else
      tags = []
      pre_drill_params[:tags]&.each do |name|
        tags << Tag.find_or_create_by(name: name)
        pre_drill_params[:tags] = tags
      end
    end
    # plan list
    if params[:plans].blank?
      pre_drill_params[:plans] = []
    else
      plans = []
      pre_drill_params[:plans]&.each do |title|
      plans << Plan.find_by(title: title)
      pre_drill_params[:plans] = plans
      end
    end
    # library list
    if params[:libraries].blank?
      pre_drill_params[:libraries] = []
    else
      libraries = []
      pre_drill_params[:libraries]&.each do |title|
      libraries << Library.find_by(title: title)
      pre_drill_params[:libraries] = libraries
      end
    end
    return pre_drill_params
  end

end
