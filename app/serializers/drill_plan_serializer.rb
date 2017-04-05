class DrillPlanSerializer < ActiveModel::Serializer
  attributes :drill_id, :plan_id, :order_by
  has_one :drill
  has_one :plan
end
