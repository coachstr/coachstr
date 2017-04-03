class DrillSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duration
end
