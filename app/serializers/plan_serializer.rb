class PlanSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :total_duration
  has_many :tags
  has_many :drills
  belongs_to :user

  def drills
    id_titles = []
    object.drills.pluck(:title, :id).each do |title, id|
      id_titles << {title: title, id: id}
    end
    return id_titles
  end

  def tags
    names = []
    object.tags.pluck(:name).each do |name|
      names << {name: name}
    end
    return names
  end

end
