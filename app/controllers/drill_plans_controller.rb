class DrillPlansController < ApplicationController
  before_action :find_drill_plan, only: [:update, :destroy]

  def create
    @drill_plan =  Drill_plan.new(drill_plan_params)
    if @drill_plan.save
      render json: @drill_plan
    else
      render json: @drill_plan.errors.full_messages, status: 400
    end
  end

  def update
    # find_drill_plan
  end

  def destroy
    # find_drill_plan
    @drill_plan.destroy
  end


  private

  def find_drill_plan
    @drill_plan = Drill_plan.where('id = ? and  plan_id = ?', params['plan_id'], params['id'])
  end

  def drill_plan_params
    params.permit(:id, :plan_id, :drill_id, :order_by)
  end

end