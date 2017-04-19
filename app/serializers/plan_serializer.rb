class PlanSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :total_duration
  has_many :tags
  has_many :drills
  belongs_to :user

  def drills
    titles = []
    object.drills.pluck(:title).each do |title|
      titles << {title: title}
    end
    return titles
  end

  def tags
    names = []
    object.tags.pluck(:name).each do |name|
      names << {name: name}
    end
    return names
  end

end
