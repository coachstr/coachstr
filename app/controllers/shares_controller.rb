class SharesController < ApplicationController

  before_action :find_plan
  before_action :find_drill

  def create
    if params[:drill_id]
      DrillMailer.share(@drill, params[:share][:email]).deliver
    elsif params[:plan_id]
      PlanMailer.share(@plan, params[:share][:email]).deliver
    end
  end


  private

  def find_drill
    @drill = Drill.find(params[:drill_id])
  end

  def find_plan
    @plan = Plan.find(params[:plan_id])
  end

end
