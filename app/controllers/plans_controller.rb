class PlansController < ApplicationController
  before_action :find_plan, only: [:show, :update, :destroy]
  before_action :require_user, only: [:index, :create, :update]

  def index
      @plans = current_user.plans
      render json: @plans
  end

  def create
      @plan = Plan.new(plan_params)
      if @plan.save
        @plan.update!(after_save_params)
        render json: @plan
      else
        error = @plan.errors.full_messages.collect do |error_message|
          {:error => error_message}
        end
        @errors = {:errors => error}
        render json: @errors, status: 400
      end
  end

  def show
    # find_plan
    render json: @plan
  end

  def update
    # find_plan
      if @plan.update!(plan_params)
        @plan.update!(after_save_params)
        render json: @plan
      else
        error = @plan.errors.full_messages.collect do |error_message|
          {:error => error_message}
        end
        @errors = {:errors => error}
        render json: @errors, status: 400
      end
  end

  def destroy
    # find_plan
    @plan.destroy
  end

  private

  def find_plan
    @plan = Plan.find(params['id'])
  end

  def plan_params
    params[:user_id] = User.find_by(token: params[:token]).id

    params.permit(:title, :total_duration, :user_id )

  end

  def after_save_params
    pre_drill_params = params.permit( :tags => [], :plans => [] )

    # tag list
    if params[:tags].blank?
     pre_drill_params[:tags] = []
    else
     tags = []
     pre_drill_params[:tags].split(%r{,\s*})&.each do |name|
       tags << Tag.find_or_create_by(name: name)
       pre_drill_params[:tags] = tags
     end
    end
    # plan list
    if params[:plans].blank?
     pre_drill_params[:plans] = []
    else
     plans = []
     pre_drill_params[:plans].split(%r{,\s*})&.each do |title|
     plans << Plan.find_by(title: title)
     pre_drill_params[:plans] = plans
     end
    end
    return pre_drill_params
  end
end
