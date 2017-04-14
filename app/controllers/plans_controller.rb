class PlansController < ApplicationController
  before_action :find_plan, only: [:show, :update, :destroy]
  before_action :require_user, only: [:index, :create, :update]

  def index
      @plans = current_user.plans
      @plans.each do |plan|
        durations = []
        plan.drills.each do |drill|
          durations << drill.duration
        end
        plan.total_duration = (durations.sum / 60)
      end
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
    durations = []
    @plan.drills.each do |drill|
      durations << drill.duration
    end
    @plan.total_duration = (durations.sum / 60)
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
    params[:total_duration] = (params[:total_duration].to_i * 60);
    params.permit(:title, :total_duration, :user_id )

  end

  def after_save_params
    pre_plan_params = params.permit( :tags => [], :drills => [], :drill_plans => [] )

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
      drill_plans = []
      # pre_plan_params[:order_by] = []
      pre_plan_params[:drills]&.each_with_index do |drill_id, id|
        if id < 10
          id = "00#{id}".to_s
        elsif id > 9 && id < 100
          id = "0#{id}".to_s
        else
          id = id.to_s
        end
        drill_plans << DrillPlan.new(drill_id: drill_id, order_by: id)
        pre_plan_params[:drills] = []
        pre_plan_params[:drill_plans] = drill_plans
      end
    end
    return pre_plan_params
  end
end
