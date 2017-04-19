class SharesController < ApplicationController

  # before_action :find_plan
  # before_action :find_drill

  def create
    # binding.pry
    if User.find_by(email: params[:share][:email]).nil?
      render json: ['This email doesn\'t belong to any users. If you are sure that this email is correct, please have them sign up. Otherwise, please try again.']
    else
      if params[:drill_id]
        @drill = Drill.find(params[:drill_id])
        DrillMailer.share(@drill, params[:share][:email]).deliver
      elsif params[:plan_id]
        @plan = Plan.find(params[:plan_id])
        PlanMailer.share(@plan, params[:share][:email]).deliver
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
