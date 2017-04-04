class PlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :total_duration, :start_time
end
