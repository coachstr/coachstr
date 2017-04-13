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
    pre_plan_params = params.permit( :tags => [], :drills => [] )

    # tag list
    if params[:tags].blank?
      pre_plan_params[:tags] = []
    else
      tags = []
      pre_plan_params[:tags]&.each do |name|
        tags << Tag.find_or_create_by(name: name)
        pre_plan_params[:tags] = tags
      end
    end
    # plan list
    if params[:drills].blank?
      pre_plan_params[:drills] = []
    else
      drills = []
      pre_plan_params[:drills]&.each do |id|
      drills << Drill.find_by(id: id)
      pre_plan_params[:drills] = drills
      end
    end
    return pre_plan_params
  end
end
