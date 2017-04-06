class SharesController < ApplicationController

  before_action :find_plan
  before_action :find_drill

  def create
    if params[:share][:email].blank?
      flash[:warning] = "Please enter an email"
      render :new
    else
      if params[:drill_id]
        DrillMailer.share(@drill, params[:share][:email]).deliver
        flash[:success] = "Shared"
      else
        PlanMailer.share(@plan, params[:share][:email]).deliver
        flash[:success] = "Shared"
      end
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
