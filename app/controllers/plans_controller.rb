class PlansController < ApplicationController

  def index
    if Tag.find(params['id']).exists?
      @plans = Plan.where()
    else
      @plans = Plan.all
    end
    render json: @plans
  end



end
