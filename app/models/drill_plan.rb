class DrillPlan < ApplicationRecord
  belongs_to :drill
  belongs_to :plan

  default_scope {order(:order_by => :asc)}
end
