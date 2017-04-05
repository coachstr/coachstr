class PlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :total_duration, :start_time



  def tags
    names = []
    object.tags.pluck(:name).each do |name|
      names << {name: name}
    end
    return names
  end

end
