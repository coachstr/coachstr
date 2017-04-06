class PlansController < ApplicationController
  before_action :find_plan, only: [:show, :update, :destroy]

  def index
    if current_user
      @plans = current_user.plans
    else
      error = {:error => "need to be logged in"}
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def create
    if current_user
      @plan = Plan.new(plan_params)
      if @plan.save
        render json: @plan
      else
        error = @plan.errors.full_messages.collect do |error_message|
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
    # find_plan
    render json: @plan, include: [@plan.tags, @plan.drills]
  end

  def update
    # find_plan
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

    pre_plan_params = params.permit(:title,
                             :total_duration,
                             :tags,
                             :drills,
                             :user_id)
    tags = Array.new
    pre_plan_params[:tags].split(%r{,\s*}).each do |name|
      tags << Tag.find_or_create_by(name: name)
    end
    pre_plan_params[:tags] = tags
    drills = Array.new
    pre_plan_params[:drills].split(%r{,\s*}).each do |title|
      drills << Drill.find_by(title: title)
    end
    pre_plan_params[:drills] = drills
    return pre_plan_params
  end
end
